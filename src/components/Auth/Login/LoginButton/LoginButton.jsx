import { Link } from "react-router-dom";
import SvgLogin from "../../../svg/SvgLogin/SvgLogin";
import "./LoginButton.css";

const LoginButton = () => {
  return (
    <Link className="btn customed-button" title="login" to={"users/login"}>
      <span id="login-icon">
        <SvgLogin />
      </span>
      <span id="login-word">login</span>
    </Link>
  );
};

export default LoginButton;
