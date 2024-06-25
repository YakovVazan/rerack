import { Link } from "react-router-dom";
import useNavigation from "../../../../hooks/useNavigation";
import SvgSettings from "../../../svg/SvgSettings/SvgSettings";
import { localStorageId } from "../../../../config/localStorage";
import "./AccountButton.css";

const AccountButton = () => {
  const { isSettingsPage, isAdminPage } = useNavigation();

  return (
    !isSettingsPage &&
    !isAdminPage && (
      <Link
        className="btn btn-outline-secondary"
        title="settings"
        to={{ pathname: `/users/${localStorageId}` }}
        data-bs-dismiss="offcanvas"
      >
        <span id="account-icon">
          <SvgSettings />
        </span>
        <span id="account-word">settings</span>
      </Link>
    )
  );
};

export default AccountButton;
