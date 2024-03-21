import { useContext } from "react";
import Context from "../../../../context/Context";
import { localStorageLogout } from "../../../../config/localStorage";
import "./LogoutButton.css";
import SvgLogout from "../../../svg/SvgLogout/SvgLogout";

const LogoutButton = () => {
  const contextData = useContext(Context);

  function handleLogout() {
    localStorageLogout();
    contextData["setToken"]("");
    contextData["setToastMessage"]("Loggoud out successfully");
    contextData["setToastVisibility"](true);
  }

  return (
    <>
      <span
        className="btn btn-outline-secondary"
        title="logout"
        onClick={handleLogout}
        data-bs-dismiss="offcanvas"
      >
        <span id="logout-icon">
          <SvgLogout/>
        </span>
        <span id="logout-word">logout</span>
      </span>
    </>
  );
};

export default LogoutButton;
