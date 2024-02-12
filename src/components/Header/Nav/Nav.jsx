import { Link, useLocation } from "react-router-dom";
import SearchBox from "../../SeekingTools/SearchBox/SearchBox.jsx";
import TypeDropDown from "../../SeekingTools/DropDowns/TypeDropDown/TypeDropDown.jsx";
import CompanyDropDown from "../../SeekingTools/DropDowns/CompanyDropDown/CompanyDropDown.jsx";
import FilterAndLayout from "../../SeekingTools/FilterAndLayout/FilterAndLayout.jsx";
import HamburgerAndSideBar from "../HamburgerAndSideBar/HamburgerAndSideBar.jsx";
import usePlugsNames from "../../../hooks/usePlugsNames.jsx";
import "./Nav.css";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const secondQuery = location.pathname.split("/")[2];
  const plugsNames = usePlugsNames();
  const plugName = plugsNames.includes(secondQuery)
    ? secondQuery.replace("_", " ")
    : "";

  return (
    <nav>
      {/* nav bar right side */}
      <Link to="/" id="logo-name">
        <div id="nav-left">
          {isHomePage ? (
            <h1 id="large-main-link">Plugins</h1>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>
          )}
        </div>
      </Link>

      {/* nav bar left side */}
      {isHomePage ? (
        <>
          <div id="elements-in-nav-container">
            <FilterAndLayout />

            <div id="drop-down-in-nav-container">
              <TypeDropDown />
              <CompanyDropDown />
            </div>

            <SearchBox />
          </div>

          <div id="hamburger-for-side-bar">
            <HamburgerAndSideBar />
          </div>
        </>
      ) : (
        <h1>{plugName}</h1>
      )}
    </nav>
  );
};

export default Header;
