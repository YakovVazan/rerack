import { Link } from "react-router-dom";
import SvgRegister from "../../../svg/SvgRegister/SvgRegister";
import "./RegisterButton.css";

const RegisterButton = () => {
  return (
    <Link
      className="btn customed-button"
      title="register"
      to={"users/auth/register"}
    >
      <span id="register-icon">
        <SvgRegister />
      </span>
      <span id="register-word">register</span>
    </Link>
  );
};

export default RegisterButton;
