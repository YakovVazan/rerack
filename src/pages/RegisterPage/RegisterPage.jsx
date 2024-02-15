import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Common/Spinner/Spinner";

const RegisterPage = () => {
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
    const res = await fetch("https://api-rerack.onrender.com/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const response = JSON.parse(await res.text());

      console.log(response?.msg || response.error);
    } else {
      navigate("/users/login");
    }
  }

  return loadingUser ? (
    <Spinner />
  ) : (
    <form method="post" onSubmit={(event) => handleSubmit(event)}>
      <div className="form-floating">
        <input
          type="text"
          name="name"
          id="floatingName"
          className="form-control"
          placeholder="Username"
          onChange={handleChange}
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
      <input type="reset" value="Reset" className="btn btn-outline-secondary" />
      <input
        type="submit"
        value="Submit"
        className="btn btn-outline-secondary"
      />
    </form>
  );
};

export default RegisterPage;
