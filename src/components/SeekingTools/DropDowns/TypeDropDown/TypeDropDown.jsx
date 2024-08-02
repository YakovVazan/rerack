import { useContext, useEffect, useState } from "react";
import useTypes from "../../../../hooks/useTypes.jsx";
import Context from "../../../../context/Context.jsx";
import { consts } from "../../../../config/constants.js";
import Spinner from "../../../Common/Spinner/Spinner.jsx";
import SvgCheck from "../../../svg/SvgCheck/SvgCheck.jsx";
import ColoredDivider from "../../../Common/ColoredDivider/ColoredDivider.jsx";
import "./TypeDropDown.css";

const TypeDropDown = () => {
  const { typesList } = useTypes();
  const [chosenTypes, setChosenTypes] = useState([]);
  const { typeFilterValue, setTypeFilterValue } = useContext(Context);

  const handleClick = (typeName) => {
    if (chosenTypes.includes(typeName)) {
      setChosenTypes(chosenTypes.filter((t) => t !== typeName));
    } else {
      setChosenTypes([...chosenTypes, typeName]);
    }
  };

  const setValue = () => {
    return chosenTypes.length > 0
      ? chosenTypes.join(", ")
      : consts.typeDropDownInitialValue;
  };

  useEffect(() => {
    setTypeFilterValue(
      chosenTypes.join(", ") || consts.typeDropDownInitialValue
    );
  }, [chosenTypes]);

  useEffect(() => {
    if (typeFilterValue === consts.typeDropDownInitialValue) setChosenTypes([]);
  }, [typeFilterValue]);

  return (
    <>
      <div
        className="dropdown-center search-button-container"
        title={setValue()}
      >
        <button
          id="type-filter"
          className="btn customed-button dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="inner-button-text-type">{setValue()}</span>
        </button>
        {/* filter drop down */}
        <ul className="dropdown-menu customed-dropdown">
          <div
            className="dropdown-item customed-dropdown-item"
            onClick={() => setChosenTypes([])}
          >
            <span>all</span>
            {typeFilterValue === "type" && (
              <span className="customed-svg-emphesized">
                <SvgCheck />
              </span>
            )}
          </div>
          <ColoredDivider />
          {typesList.length === 0 ? (
            <Spinner />
          ) : (
            typesList.map((type, index) => (
              <li
                key={index}
                className="dropdown-item customed-dropdown-item"
                onClick={() => handleClick(type)}
              >
                <span className="type-content">{type}</span>
                <span
                  className={`${
                    chosenTypes.includes(type)
                      ? "customed-svg-emphesized"
                      : "customed-svg-faded"
                  }`}
                >
                  <SvgCheck />
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default TypeDropDown;
