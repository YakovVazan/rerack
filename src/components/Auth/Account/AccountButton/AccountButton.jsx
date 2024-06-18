import { Link } from "react-router-dom";
import SvgSettings from "../../../svg/SvgSettings/SvgSettings";
import { localStorageId } from "../../../../config/localStorage";
import "./AccountButton.css";

const AccountButton = () => {
  return (
    <Link
      className="btn btn-outline-secondary"
      title="settings"
      to={{ pathname: `/users/${localStorageId}` }}
      data-bs-dismiss="offcanvas"
    >
      <span id="account-icon">
        <SvgSettings/>
      </span>
      <span id="account-word">settings</span>
    </Link>
  );
};

export default AccountButton;
