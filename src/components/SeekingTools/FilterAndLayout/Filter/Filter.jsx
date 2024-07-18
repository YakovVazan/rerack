import { useContext } from "react";
import Context from "../../../../context/Context";
import SvgCheck from "../../../svg/SvgCheck/SvgCheck";
import useDataSorter from "../../../../hooks/useDataSorter";
import SvgFilter from "../../../svg/SvgFilter/SvgFilter";
import "../../../../styles/dropdowns.css";
import "../../../../styles/buttons.css";
import "./Filter.css";

const Filter = () => {
  useDataSorter();

  const contextData = useContext(Context);

  function handleClick(query) {
    contextData["setOrderBy"](query);
    localStorage.setItem("rerackOrder", query);
  }

  return (
    <>
      <div
        className="btn customed-button"
        data-bs-toggle="dropdown"
        title="filter A-Z"
      >
        <SvgFilter />
      </div>

      {/* filter drop down */}
      <ul className="dropdown-menu customed-dropdown">
        {["name", "type", "company"].map((item) => {
          return (
            <li
              key={item}
              className="dropdown-item customed-dropdown-item"
              onClick={() => handleClick(item)}
            >
              <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
              {contextData["orderBy"] === item && (
                <span id="check-sign-container">
                  <SvgCheck />
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Filter;
