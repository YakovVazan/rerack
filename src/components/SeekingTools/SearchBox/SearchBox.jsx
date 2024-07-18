import { useContext } from "react";
import Context from "../../../context/Context.jsx";
import { consts } from "../../../config/constants.js";
import SvgReset from "../../svg/SvgReset/SvgReset.jsx";
import SvgSearch from "../../svg/SvgSearch/SvgSearch.jsx";
import { ResetAllFactors } from "../../../utils/ResetFactors/ResetFactors.jsx";
import "../../../styles/buttons.css";
import "./SearchBox.css";

const SearchBox = () => {
  const {
    typeFilterValue,
    companyFilterValue,
    searchBoxValue,
    setSearchBoxValue,
    setTypeFilterValue,
    setCompanyFilterValue,
  } = useContext(Context);

  const shouldBeDisabled =
    searchBoxValue === "" &&
    typeFilterValue === consts.typeDropDownInitialValue &&
    companyFilterValue === consts.companyDropDownInitialValue;

  function handleSearchBox(value) {
    setSearchBoxValue(value.toLowerCase());
  }

  function resetAllFactors() {
    setSearchBoxValue("");
    setTypeFilterValue(consts.typeDropDownInitialValue);
    setCompanyFilterValue(consts.companyDropDownInitialValue);
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
        className={`btn customed-button input-group-text ${
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
        className="btn customed-button"
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
