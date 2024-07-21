import { useContext } from "react";
import Context from "../../../../context/Context.jsx";
import { consts } from "../../../../config/constants.js";
import Spinner from "../../../Common/Spinner/Spinner.jsx";
import SvgCheck from "../../../svg/SvgCheck/SvgCheck.jsx";
import useCompanies from "../../../../hooks/useCompanies.jsx";
import ColoredDivider from "../../../Common/ColoredDivider/ColoredDivider.jsx";
import { ResetCompanyValue } from "../../../../utils/ResetFactors/ResetFactors.jsx";
import "../../../../styles/dropdowns.css";
import "../../../../styles/buttons.css";
import "./CompanyDropDown.css";

const CompanyDropDown = () => {
  const contextData = useContext(Context);
  const { companiesList } = useCompanies();
  const setCompanyFilterValue = contextData["setCompanyFilterValue"];
  const companyFilterValue = contextData["companyFilterValue"];

  function handleClick(companyName) {
    ResetCompanyValue(companyName);

    setCompanyFilterValue(companyName);
  }

  return (
    <>
      <div className="dropdown-center search-button-container" title="company">
        <button
          id="company-filter"
          className="btn customed-button dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="inner-button-text-company">
            {companyFilterValue}
          </span>
        </button>
        {/* filter drop down */}
        <ul className="dropdown-menu customed-dropdown">
          <div
            className="dropdown-item customed-dropdown-item"
            onClick={() => handleClick(consts.companyDropDownInitialValue)}
          >
            <span>all</span>
            {companyFilterValue === "company" && (
              <span>
                <SvgCheck />
              </span>
            )}
          </div>
          <ColoredDivider />
          {companiesList.length === 0 ? (
            <Spinner />
          ) : (
            companiesList.map((company, index) => (
              <li
                key={index}
                className="dropdown-item customed-dropdown-item"
                onClick={() => handleClick(company)}
              >
                <span className="company-content">{company}</span>
                {companyFilterValue === company && (
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

export default CompanyDropDown;
