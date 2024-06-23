import { Link, useLocation } from "react-router-dom";
import Auth from "../../Auth/Auth.jsx";
import useHistory from "../../../hooks/useHistory.jsx";
import SvgReturn from "../../svg/SvgReturn/SvgReturn.jsx";
import useNavigation from "../../../hooks/useNavigation.jsx";
import HamburgerAndSideBar from "../HamburgerAndSideBar/HamburgerAndSideBar.jsx";
import "./Nav.css";

const Header = () => {
  const location = useLocation();
  const { history, setHistory, backArrowTitle } = useHistory();
  const { isHomePage, isPlugPage, isAccountPage, isAdminPage } =
    useNavigation();
  const firstQuery = location.pathname.split("/")[1];
  const secondQuery = location.pathname.split("/")[2];
  const rightHeader = /^\d+$/.test(secondQuery)
    ? "Settings"
    : firstQuery === "users" && !["login", "register"].includes(secondQuery)
    ? "Dashboard"
    : "";

  const trimHistory = () => {
    setHistory(history.slice(0, -1));
  };

  return (
    <nav>
      {/* nav bar left side */}
      <Link
        to={history[history.length - 2]}
        id="logo-name"
        onClick={trimHistory}
      >
        <div id="nav-left">
          {isHomePage ? (
            <h1 id="large-main-link">Plugins</h1>
          ) : (
            <span id="nav-left-container">
              <SvgReturn />
              <span>{backArrowTitle}</span>
            </span>
          )}
        </div>
      </Link>

      {/* nav bar right side */}
      {isHomePage || isPlugPage || isAccountPage || isAdminPage ? (
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
