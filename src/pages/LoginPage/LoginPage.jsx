import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../context/Context";
import useToasts from "../../hooks/useToasts";
import { consts } from "../../config/constants";
import Spinner from "../../components/Common/Spinner/Spinner";
import {
  localStorageLogin,
  localStorageHistory,
} from "../../config/localStorage";
import "../../styles/auth-card.css";

const LoginPage = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const contextData = useContext(Context);
  const [loadingUser, setLoadingUser] = useState(false);
  const [formData, setFormData] = useState({
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
    event.preventDefault();
    setLoadingUser(true);
    loginUser(formData);
  }

  async function loginUser(data) {
    const res = await fetch(`${consts.baseURL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const response = JSON.parse(await res.text());
    if (!res.ok) {
      showToast(
        response?.msg || response.error || "An error occurred while logging in"
      );
      setLoadingUser(false);
    } else {
      localStorageLogin(
        response.token,
        response.id,
        response.isOwner,
        response.isVerified
      );
      const userLastRoute = JSON.parse(localStorageHistory);
      contextData["setToken"](response.token);
      navigate(userLastRoute[userLastRoute.length - 2] || "/");
      showToast(`${response.name} logged in using ${response.email}`);
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
              <strong>Login</strong>
            </h3>
          </div>
          <div className="card-body">
            <div className="form-floating">
              <input
                type="email"
                name="email"
                id="floatingEmail"
                className="form-control"
                placeholder="Email"
                onChange={handleChange}
                autoFocus
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
              <Link to={"/users/forgot_password"}>
                <small>Forgot password?</small>
              </Link>
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
              Don&#39;t have an account yet?{" "}
              <Link to={"/users/register"}>Register</Link>
            </small>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
