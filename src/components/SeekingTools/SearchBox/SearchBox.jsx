import { useContext } from "react";
import Context from "../../../context/Context.jsx";
import { ResetAllFactors } from "../../../utils/ResetFactors/ResetFactors.jsx";
import "./SearchBox.css";

const SearchBox = () => {
  const contextData = useContext(Context);
  const setSearchBoxValue = contextData["setSearchBoxValue"];

  function handleSearchBox(value) {
    setSearchBoxValue(value.toLowerCase().trim());
  }

  function resetAllFactors() {
    contextData["setSearchBoxValue"]("");
    contextData["setTypeFilterValue"]("");
    contextData["setCompanyFilterValue"]("");

    ResetAllFactors();
  }

  return (
    <>
      <div className="input-group">
        <div
          className="btn btn-outline-secondary input-group-text"
          type="button"
          title="search"
          data-bs-dismiss="offcanvas"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>
        <input
          type="text"
          className="form-control plugins-filter-input"
          placeholder="Search by name"
          onInput={(event) => handleSearchBox(event.target.value)}
        />
        <div
          className="btn btn-outline-secondary"
          type="button"
          title="reset factors"
          data-bs-dismiss="offcanvas"
          onClick={resetAllFactors}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-clockwise"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
