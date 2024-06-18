import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../../../context/Context";
import SvgLogout from "../../../svg/SvgLogout/SvgLogout";
import { localStorageLogout } from "../../../../config/localStorage";
import "./LogoutButton.css";

const LogoutButton = () => {
  const navigate = useNavigate();
  const contextData = useContext(Context);

  function handleLogout() {
    localStorageLogout();
    contextData["setToken"]("");
    contextData["setToastMessage"]("Loggoud out successfully");
    contextData["setToastVisibility"](true);
    navigate("/");
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
          <SvgLogout />
        </span>
        <span id="logout-word">logout</span>
      </span>
    </>
  );
};

export default LogoutButton;
