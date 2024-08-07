import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToasts from "../../../hooks/useToasts";
import { register } from "../../../services/auth";
import Spinner from "../../../components/Common/Spinner/Spinner";

const RegisterPage = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
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
    const res = await register(data);

    if (!res.ok) {
      const response = JSON.parse(await res.text());

      let errorMessages =
        typeof response.msg === "string" ? [response.msg] : response.msg;

      for (let i = 0; i < errorMessages.length; i++) {
        if (i < errorMessages.length - 2) {
          errorMessages[i] += ", ";
        } else if (i === errorMessages.length - 2) {
          errorMessages[i] += " and ";
        }
      }

      showToast(errorMessages || "An error occurred while registering");

      setLoadingUser(false);
    } else {
      navigate("/users/auth/login");
      showToast(`${data.name} registered successfully using ${data.email}`);
    }
  }

  return loadingUser ? (
    <Spinner />
  ) : (
    <div className="authentication-form">
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
                className="btn customed-button"
              />
              <input
                type="submit"
                value="Submit"
                className="btn customed-button"
              />
            </div>
            <hr />
            <small>
              Already registered? <Link to={"/users/auth/login"}>Login</Link>
            </small>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
