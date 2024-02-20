import AuthAndInfo from "../../AuthAndInfo/AuthAndInfo.jsx";
import AddButton from '../../Adding/AddButton/AddButton.jsx'
import SearchBox from "../../SeekingTools/SearchBox/SearchBox.jsx";
import Layout from "../../SeekingTools/FilterAndLayout/Layout/Layout.jsx";
import Filter from "../../SeekingTools/FilterAndLayout/Filter/Filter.jsx";
import TypeDropDown from "../../SeekingTools/DropDowns/TypeDropDown/TypeDropDown.jsx";
import CompanyDropDown from "../../SeekingTools/DropDowns/CompanyDropDown/CompanyDropDown.jsx";
import "./HamburgerAndSideBar.css";
import TransparentDivider from "../../Common/TransparentDivider/TransparentDivider.jsx";

const HamburgerAndSideBar = () => {
  return (
    <>
      <div
        className="btn btn-outline-secondary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      </div>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h3 className="offcanvas-title" id="offcanvasRightLabel">
            <strong>Controls</strong>
          </h3>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div id="uppder-offcanvas-body">
            <SearchBox />
            <TransparentDivider/>
            <div id="dropDownsContainer">
              <TypeDropDown />
              <CompanyDropDown />
            </div>
            <TransparentDivider/>
            <div id="filter-and-layout-container-for-small-screens">
              <Layout />
              <Filter />
            </div>
            <hr className="dropdown-divider"></hr>
          </div>
          <div id="lower-offcanvas-body">
            <AddButton/>
            <hr className="dropdown-divider"></hr>
            <AuthAndInfo />
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerAndSideBar;
