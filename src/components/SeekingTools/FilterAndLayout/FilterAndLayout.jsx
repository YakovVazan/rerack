import Layout from "./Layout/Layout.jsx";
import Filter from "./Filter/Filter.jsx";
import "./FilterAndLayout.css";

const FilterAndLayout = () => {
  return (
    <div id="filter-and-layout-container-for-big-screens">
      <Filter />
      <Layout />
    </div>
  );
};

export default FilterAndLayout;
