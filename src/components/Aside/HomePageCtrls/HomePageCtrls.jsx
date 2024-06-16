import { Link } from "react-router-dom";
import AuthAndInfo from "../../AuthAndInfo/AuthAndInfo";
import SearchBox from "../../SeekingTools/SearchBox/SearchBox";
import AddButton from "../../PlugActions/Adding/AddButton/AddButton";
import Filter from "../../SeekingTools/FilterAndLayout/Filter/Filter";
import Layout from "../../SeekingTools/FilterAndLayout/Layout/Layout";
import TypeDropDown from "../../SeekingTools/DropDowns/TypeDropDown/TypeDropDown";
import TransparentDivider from "../../Common/TransparentDivider/TransparentDivider";
import CompanyDropDown from "../../SeekingTools/DropDowns/CompanyDropDown/CompanyDropDown";
import "./HomePageCtrls.css";

const HomePageCtrls = () => {
  return (
    <>
      <div id="upper-aside">
        <SearchBox />
        <TransparentDivider />
        <div id="dropDownsContainer">
          <TypeDropDown />
          <CompanyDropDown />
        </div>
        <TransparentDivider />
        <div id="filter-and-layout-container-for-small-screens">
          <Layout />
          <Filter />
        </div>
        <hr className="dropdown-divider"></hr>
      </div>
      <div id="lower-aside">
        <AddButton />
        <TransparentDivider />
        <div id="big-screens-lower-aside">
          <Link to={"privacy_policy"}>Privacy Policy</Link>
          <span>0.0.0</span>
        </div>
        <div id="small-screens-lower-aside">
          <AuthAndInfo />
        </div>
      </div>
    </>
  );
};

export default HomePageCtrls;
