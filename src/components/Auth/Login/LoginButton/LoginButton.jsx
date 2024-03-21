import { Link } from "react-router-dom";
import "./LoginButton.css";
import SvgLogin from "../../../svg/SvgLogin/SvgLogin";

const LoginButton = () => {
  return (
    <Link
      className="btn btn-outline-secondary"
      title="login"
      to={"users/login"}
    >
      <span id="login-icon">
        <SvgLogin />
      </span>
      <span id="login-word">login</span>
    </Link>
  );
};

export default LoginButton;
