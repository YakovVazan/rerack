import { Link } from "react-router-dom";
import SvgAccount from "../../../svg/SvgAccount/SvgAccount";
import { localStorageId } from "../../../../config/localStorage";
import "./AccountButton.css";

const AccountButton = () => {
  return (
    <Link
      className="btn btn-outline-secondary"
      title="account"
      to={{ pathname: `/users/${localStorageId}` }}
    >
      <span id="account-icon">
        <SvgAccount/>
      </span>
      <span id="account-word">account</span>
    </Link>
  );
};

export default AccountButton;
