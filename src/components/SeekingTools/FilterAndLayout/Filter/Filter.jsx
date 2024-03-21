import { useContext, useEffect } from "react";
import Context from "../../../../context/Context";
import useDataSorter from "../../../../hooks/useDataSorter";
import "./Filter.css";
import SvgFilter from "../../../svg/SvgFilter/SvgFilter";

const Filter = () => {
  useDataSorter();

  const contextData = useContext(Context);

  const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
  </svg>`;

  function handleClick(query) {
    contextData["setOrderBy"](query);
    localStorage.setItem("rerackOrder", query);
  }

  useEffect(() => {
    document.querySelectorAll(".check-sign-container").forEach((container) => {
      if (
        container.parentElement.children[0].innerHTML.toLowerCase() ===
        contextData["orderBy"]
      ) {
        container.innerHTML = checkIcon;
      } else {
        container.innerHTML = "";
      }
    });
  });

  return (
    <>
      <div
        className="btn btn-outline-secondary"
        data-bs-toggle="dropdown"
        title="filter A-Z"
      >
        <SvgFilter />
      </div>

      {/* filter drop down */}
      <ul className="dropdown-menu">
        <li
          className="dropdown-item filter-dropdown-item"
          onClick={() => handleClick("name")}
        >
          <span>Name</span>
          <span className="check-sign-container"></span>
        </li>
        <li
          className="dropdown-item filter-dropdown-item"
          onClick={() => handleClick("type")}
        >
          <span>Type</span>
          <span className="check-sign-container"></span>
        </li>
        <li
          className="dropdown-item filter-dropdown-item"
          onClick={() => handleClick("company")}
        >
          <span>Company</span>
          <span className="check-sign-container"></span>
        </li>
      </ul>
    </>
  );
};

export default Filter;
