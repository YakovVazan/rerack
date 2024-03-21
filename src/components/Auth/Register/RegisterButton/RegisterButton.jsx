import { Link } from "react-router-dom";
import "./RegisterButton.css";
import SvgRegister from "../../../svg/SvgRegister/SvgRegister";

const RegisterButton = () => {
  return (
    <Link
      className="btn btn-outline-secondary"
      title="register"
      to={"users/register"}
    >
      <span id="register-icon">
        <SvgRegister />
      </span>
      <span id="register-word">register</span>
    </Link>
  );
};

export default RegisterButton;
