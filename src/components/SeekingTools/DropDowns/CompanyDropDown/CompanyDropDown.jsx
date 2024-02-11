import { useContext, useEffect, useState } from "react";
import Context from "../../../../context/Context.jsx";
import useFetchData from "../../../../hooks/useFetchData.jsx";
import Spinner from "../../../Common/Spinner/Spinner.jsx";
import { ResetCompanyValue } from "../../../../utils/ResetFactors/ResetFactors.jsx";
import "./CompanyDropDown.css";

const CompanyDropDown = () => {
  const setCompanyFilterValue = useContext(Context)["setCompanyFilterValue"];
  const [companiesList, setCompaniesList] = useState([]);
  const { data, isLoading } = useFetchData();

  function handleClick(companyName) {
    ResetCompanyValue(companyName);

    setCompanyFilterValue(companyName);
  }

  useEffect(() => {
    if (!isLoading) {
      setCompaniesList([...new Set(data.map((plug) => plug.company))]);
    }
  }, [isLoading]);

  return (
    <>
      <div className="dropdown-center search-button-container" title="company">
        <button
          id="company-filter"
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="inner-button-text-company">company</span>
        </button>
        {/* filter drop down */}
        <ul className="dropdown-menu">
          <div className="dropdown-item" onClick={() => handleClick("")}>
            all
          </div>
          <hr className="dropdown-divider"></hr>
          {companiesList.length === 0 ? (
            <Spinner />
          ) : (
            companiesList.map((company, index) => (
              <li
                key={index}
                className="dropdown-item"
                onClick={() => handleClick(company)}
              >
                {company}
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default CompanyDropDown;
