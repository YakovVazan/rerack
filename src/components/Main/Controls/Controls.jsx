import { Link } from "react-router-dom";
import TransparentDivider from "../../Common/TransparentDivider/TransparentDivider";
import AddButton from "../../PlugActions/Adding/AddButton/AddButton";
import CompanyDropDown from "../../SeekingTools/DropDowns/CompanyDropDown/CompanyDropDown";
import TypeDropDown from "../../SeekingTools/DropDowns/TypeDropDown/TypeDropDown";
import Filter from "../../SeekingTools/FilterAndLayout/Filter/Filter";
import Layout from "../../SeekingTools/FilterAndLayout/Layout/Layout";
import SearchBox from "../../SeekingTools/SearchBox/SearchBox";
import "./Controls.css";

const Controls = () => {
  return (
    <aside>
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
        <div id="bottom-lower-aside">
          <Link to={"privacy_policy"}>Privacy Policy</Link>
          <span>0.0.0</span>
        </div>
      </div>
    </aside>
  );
};

export default Controls;
