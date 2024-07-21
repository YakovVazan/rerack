import SearchBox from "../../SeekingTools/SearchBox/SearchBox";
import AddButton from "../../PlugActions/Adding/AddButton/AddButton";
import Filter from "../../SeekingTools/FilterAndLayout/Filter/Filter";
import Layout from "../../SeekingTools/FilterAndLayout/Layout/Layout";
import ColoredDivider from "../../Common/ColoredDivider/ColoredDivider";
import TypeDropDown from "../../SeekingTools/DropDowns/TypeDropDown/TypeDropDown";
import TransparentDivider from "../../Common/TransparentDivider/TransparentDivider";
import CompanyDropDown from "../../SeekingTools/DropDowns/CompanyDropDown/CompanyDropDown";
import "./HomePageCtrls.css";

const HomePageCtrls = () => {
  return (
    <div id="home-page-aside-list-wrapper">
      <span>
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
        <ColoredDivider />
      </span>
      <AddButton />
    </div>
  );
};

export default HomePageCtrls;
