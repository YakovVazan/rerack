import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Context from "../../../../context/Context";
import useToasts from "../../../../hooks/useToasts";
import SvgLogout from "../../../svg/SvgLogout/SvgLogout";
import { localStorageLogout } from "../../../../config/localStorage";
import { userSessionIsValid } from "../../../../services/sessions.js";
import "./LogoutButton.css";

const LogoutButton = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const location = useLocation();
  const contextData = useContext(Context);

  useEffect(() => {
    handleSessionExpired();
  }, [location.pathname]);

  // log out user if session expired
  const handleSessionExpired = async () => {
    try {
      const response = await userSessionIsValid();

      if (!response.ok) {
        const res = await response.json();
        handleLogout();
        showToast(
          <span>
            {res.msg}. Please <Link to={"users/auth/login"}>relogin</Link>
          </span>
        );
      }
    } catch (error) {
      console.error(error);
      showToast("Server's down");
    }
  };

  const handleClick = () => {
    handleLogout();
    showToast("Logged out successfully");
    navigate("/");
  };

  const handleLogout = () => {
    localStorageLogout();
    contextData["setToken"]("");
    navigate("/");
  };

  return (
    <>
      <span
        className="btn customed-button"
        title="logout"
        onClick={handleClick}
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
