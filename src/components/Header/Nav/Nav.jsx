import { Link, useLocation } from "react-router-dom";
import Auth from "../../Auth/Auth.jsx";
import useHistory from "../../../hooks/useHistory.jsx";
import SvgReturn from "../../svg/SvgReturn/SvgReturn.jsx";
import useNavigation from "../../../hooks/useNavigation.jsx";
import HamburgerAndSideBar from "../HamburgerAndSideBar/HamburgerAndSideBar.jsx";
import "./Nav.css";
import { setLocalStorageHistory } from "../../../config/localStorage.js";

const Header = () => {
  const location = useLocation();
  const { history, setHistory, backArrowTitle } = useHistory();
  const { isHomePage, isPlugPage, isSettingsPage, isAdminPage } =
    useNavigation();
  const firstQuery = location.pathname.split("/")[1];
  const secondQuery = location.pathname.split("/")[2];
  const rightHeader = /^\d+$/.test(secondQuery)
    ? "Settings"
    : firstQuery === "users" && !["login", "register"].includes(secondQuery)
    ? "Dashboard"
    : "";

  const trimHistory = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
      setLocalStorageHistory(
        JSON.stringify(Array.from(new Set(history.slice(0, -1))))
      );
    }
  };

  return (
    <nav>
      {/* nav bar left side */}
      <Link
        to={history.length >= 2 ? history[history.length - 2] : "/"}
        id="logo-name"
        onClick={trimHistory}
      >
        <div id="nav-left">
          {isHomePage ? (
            <h1 id="large-main-link">Plugins</h1>
          ) : (
            <span id="nav-left-container">
              <SvgReturn />
              <span>{backArrowTitle || "Home"}</span>
            </span>
          )}
        </div>
      </Link>

      {/* nav bar right side */}
      {isHomePage || isPlugPage || isSettingsPage || isAdminPage ? (
        <>
          <div id="hamburger-for-side-bar">
            <HamburgerAndSideBar />
          </div>
          <div id="elements-in-nav-container">
            <Auth />
          </div>
        </>
      ) : (
        <h1>{rightHeader}</h1>
      )}
    </nav>
  );
};

export default Header;
