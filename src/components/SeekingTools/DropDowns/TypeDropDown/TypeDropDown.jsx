import { useContext } from "react";
import useTypes from "../../../../hooks/useTypes.jsx";
import Context from "../../../../context/Context.jsx";
import { consts } from "../../../../config/constants.js";
import Spinner from "../../../Common/Spinner/Spinner.jsx";
import SvgCheck from "../../../svg/SvgCheck/SvgCheck.jsx";
import { ResetTypeValue } from "../../../../utils/ResetFactors/ResetFactors.jsx";
import "./TypeDropDown.css";

const TypeDropDown = () => {
  const contextData = useContext(Context);
  const typeFilterValue = contextData["typeFilterValue"];
  const setTypeFilterValue = contextData["setTypeFilterValue"];

  const { typesList } = useTypes();

  function handleClick(typeName) {
    ResetTypeValue(typeName);

    setTypeFilterValue(typeName);
  }

  return (
    <>
      <div className="dropdown-center search-button-container" title="Type">
        <button
          id="type-filter"
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="inner-button-text-type">{typeFilterValue}</span>
        </button>
        {/* filter drop down */}
        <ul className="dropdown-menu" id="type-drop-down">
          <div
            className="dropdown-item type-dropdown-item"
            onClick={() => handleClick(consts.typeDropDownInitialValue)}
          >
            <span>all</span>
            {typeFilterValue === "type" && (
              <span>
                <SvgCheck />
              </span>
            )}
          </div>
          <hr className="dropdown-divider"></hr>
          {typesList.length === 0 ? (
            <Spinner />
          ) : (
            typesList.map((type, index) => (
              <li
                key={index}
                className="dropdown-item type-dropdown-item"
                onClick={() => handleClick(type)}
              >
                <span className="type-content">{type}</span>
                {typeFilterValue === type && (
                  <span>
                    <SvgCheck />
                  </span>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default TypeDropDown;
