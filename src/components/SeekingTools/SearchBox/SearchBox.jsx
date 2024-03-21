import { useContext } from "react";
import Context from "../../../context/Context.jsx";
import { consts } from "../../../config/constants.js";
import { ResetAllFactors } from "../../../utils/ResetFactors/ResetFactors.jsx";
import "./SearchBox.css";
import SvgSearch from "../../svg/SvgSearch/SvgSearch.jsx";
import SvgReset from "../../svg/SvgReset/SvgReset.jsx";

const SearchBox = () => {
  const contextData = useContext(Context);
  const typeFilterValue = contextData["typeFilterValue"];
  const companyFilterValue = contextData["companyFilterValue"];
  const searchBoxValue = contextData["searchBoxValue"];
  const setSearchBoxValue = contextData["setSearchBoxValue"];
  const shouldBeDisabled =
    searchBoxValue === "" &&
    typeFilterValue === consts.typeDropDownInitialValue &&
    companyFilterValue === consts.companyDropDownInitialValue;

  function handleSearchBox(value) {
    setSearchBoxValue(value.toLowerCase());
  }

  function resetAllFactors() {
    contextData["setSearchBoxValue"]("");
    contextData["setTypeFilterValue"](consts.typeDropDownInitialValue);
    contextData["setCompanyFilterValue"](consts.companyDropDownInitialValue);
    document.querySelector("#main-container").scrollTo({ top: 0 });
    window.history.replaceState(
      {},
      document.title,
      window.location.href.split("#")[0]
    );

    ResetAllFactors();
  }

  return (
    <div className="input-group">
      <div
        className={`btn btn-outline-secondary input-group-text ${
          shouldBeDisabled && "disabled"
        }`}
        type="button"
        title="search"
        data-bs-dismiss="offcanvas"
      >
        <SvgSearch />
      </div>
      <input
        type="text"
        className="form-control plugins-filter-input"
        placeholder="Search by name"
        onInput={(event) => handleSearchBox(event.target.value)}
        value={searchBoxValue}
      />
      <div
        className="btn btn-outline-secondary"
        type="button"
        title="reset factors"
        data-bs-dismiss="offcanvas"
        onClick={resetAllFactors}
      >
        <SvgReset />
      </div>
    </div>
  );
};

export default SearchBox;
