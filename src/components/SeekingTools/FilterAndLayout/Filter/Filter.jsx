import { useContext, useEffect } from "react";
import Context from "../../../../context/Context";
import useDataSorter from "../../../../hooks/useDataSorter";
import "./Filter.css";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-funnel"
          viewBox="0 0 16 16"
        >
          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
        </svg>
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
