import { useContext, useEffect, useState } from "react";
import Context from "../../../../context/Context.jsx";
import useFetchData from "../../../../hooks/useFetchData.jsx";
import Spinner from "../../../Common/Spinner/Spinner.jsx";
import { ResetTypeValue } from "../../../../utils/ResetFactors/ResetFactors.jsx";
import { consts } from "../../../../config/constants.js";
import "./TypeDropDown.css";

const TypeDropDown = () => {
  const contextData = useContext(Context);
  const typeFilterValue = contextData["typeFilterValue"];
  const setTypeFilterValue = contextData["setTypeFilterValue"];
  const [typesList, setTypesList] = useState([]);
  const { data, isLoading } = useFetchData();

  function handleClick(typeName) {
    ResetTypeValue(typeName);

    setTypeFilterValue(typeName);
  }

  useEffect(() => {
    if (!isLoading) setTypesList([...new Set(data.map((plug) => plug.type))]);
  }, [isLoading]);

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
            className="dropdown-item"
            onClick={() => handleClick(consts.typeDropDownInitialValue)}
          >
            all
          </div>
          <hr className="dropdown-divider"></hr>
          {typesList.length === 0 ? (
            <Spinner />
          ) : (
            typesList.map((type, index) => (
              <li
                key={index}
                className="dropdown-item"
                onClick={() => handleClick(type)}
              >
                {type}
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default TypeDropDown;
