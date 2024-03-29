import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../context/Context";
import Spinner from "../../components/Common/Spinner/Spinner";
import { consts } from "../../config/constants";
import "../../styles/auth-card.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const contextData = useContext(Context);
  const [loadingUser, setLoadingUser] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    setLoadingUser(true);
    event.preventDefault();
    submitUser(formData);
  }

  async function submitUser(data) {
    const res = await fetch(`${consts.baseURL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const response = JSON.parse(await res.text());

      contextData["setToastVisibility"](true);
      contextData["setToastMessage"](response?.msg || response.error);

      setLoadingUser(false);
    } else {
      navigate("/users/login");
      contextData["setToastVisibility"](true);
      contextData["setToastMessage"](
        `${data.name} registered successfully using ${data.email}`
      );
    }
  }

  return loadingUser ? (
    <Spinner />
  ) : (
    <form method="post" onSubmit={(event) => handleSubmit(event)}>
      <div className="card auth-card">
        <div className="card-header">
          <h3>
            <strong>Register</strong>
          </h3>
        </div>
        <div className="card-body">
          <div className="form-floating">
            <input
              type="text"
              name="name"
              id="floatingName"
              className="form-control"
              placeholder="Username"
              onChange={handleChange}
              autoFocus
            />
            <label htmlFor="floatingName">Name</label>
          </div>
          <div className="form-floating">
            <input
              type="email"
              name="email"
              id="floatingEmail"
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
            />
            <label htmlFor="floatingEmail">Email</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              id="floatingPassword"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div id="auth-buttons">
            <input
              type="reset"
              value="Reset"
              className="btn btn-outline-secondary"
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-outline-secondary"
            />
          </div>
          <hr />
          <small>
            Already registered? <Link to={"/users/login"}>Login</Link>
          </small>
        </div>
      </div>
    </form>
  );
};

export default RegisterPage;
