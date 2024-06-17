import { Link, useLocation } from "react-router-dom";
import Auth from "../../Auth/Auth.jsx";
import SvgReturn from "../../svg/SvgReturn/SvgReturn.jsx";
import useNavigation from "../../../hooks/useNavigation.jsx";
import HamburgerAndSideBar from "../HamburgerAndSideBar/HamburgerAndSideBar.jsx";
import "./Nav.css";

const Header = () => {
  const location = useLocation();
  const { isHomePage, isPlugPage } = useNavigation();
  const firstQuery = location.pathname.split("/")[1];
  const secondQuery = location.pathname.split("/")[2];
  const rightHeader = /^\d+$/.test(secondQuery)
    ? "Account Center"
    : firstQuery === "users"
    ? "Dashboard"
    : "";

  return (
    <nav>
      {/* nav bar left side */}
      <Link to="/" id="logo-name">
        <div id="nav-left">
          {isHomePage ? <h1 id="large-main-link">Plugins</h1> : <SvgReturn />}
        </div>
      </Link>

      {/* nav bar right side */}
      {isHomePage || isPlugPage ? (
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
