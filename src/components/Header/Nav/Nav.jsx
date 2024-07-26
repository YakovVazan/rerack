import { Link, useLocation } from "react-router-dom";
import Auth from "../../Auth/Auth.jsx";
import useHistory from "../../../hooks/useHistory.jsx";
import SvgReturn from "../../svg/SvgReturn/SvgReturn.jsx";
import useNavigation from "../../../hooks/useNavigation.jsx";
import HamburgerAndSideBar from "../HamburgerAndSideBar/HamburgerAndSideBar.jsx";
import "./Nav.css";
import ColoredDivider from "../../Common/ColoredDivider/ColoredDivider.jsx";

const Header = () => {
  const location = useLocation();
  const { history, forceGoingBack, backArrowTitle } = useHistory();
  const {
    isHomePage,
    isPlugPage,
    isSettingsPage,
    isAdminPage,
    isNotFoundPage,
    authenticationKeywords,
    urlToArray,
  } = useNavigation();

  const firstQuery = urlToArray(location.pathname)[0];
  const secondQuery = urlToArray(location.pathname)[1];
  const rightHeader = /^\d+$/.test(secondQuery)
    ? "Settings"
    : firstQuery === "users" && !authenticationKeywords.includes(secondQuery)
    ? "Dashboard"
    : "";

  return (
    <nav>
      {/* nav bar left side */}
      <Link
        to={
          history.length >= 2
            ? isNotFoundPage
              ? history[history.length - 3]
              : history[history.length - 2]
            : "/"
        }
        id="logo-name"
        onClick={forceGoingBack}
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
      {isHomePage || isPlugPage || isSettingsPage || isAdminPage ? (
        <span id="right-navbar-container">
          <div id="elements-in-nav-container">
            <Auth />
          </div>
          <div id="hamburger-for-side-bar">
            <ColoredDivider margin={0} width="30px" rotate={90} alignSelf="center" />
            <HamburgerAndSideBar />
          </div>
        </span>
      ) : (
        <h1>{rightHeader}</h1>
      )}
    </nav>
  );
};

export default Header;
