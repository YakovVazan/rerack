import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToasts from "../../../hooks/useToasts";
import { consts } from "../../../config/constants";
import Spinner from "../../../components/Common/Spinner/Spinner";
import SvgCheck from "../../../components/svg/SvgCheck/SvgCheck";
import SvgPencil from "../../../components/svg/SvgPencil/SvgPencil";
import Scroller from "../../../components/Common/Scroller/Scroller";
import ColoredDivider from "../../../components/Common/ColoredDivider/ColoredDivider";
import {
  localStorageId,
  localStorageToken,
} from "../../../config/localStorage";
import "../SubRoutes.css";

const Contributions = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState("All");
  const [formattedData, setFormattedData] = useState([]);
  const [contributedData, setContributedData] = useState([]);
  const [loadingContributions, setLoaddingContributions] = useState(true);

  const fetchUserDistributions = async () => {
    try {
      const res = await fetch(
        `${consts.baseURL}/users/${
          location.pathname.split("/")[2]
        }/contributions`,
        {
          headers: {
            Authorization: `Bearer ${localStorageToken}`,
          },
        }
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        showToast(errorResponse.msg || errorResponse.error);
        localStorageId
          ? navigate(`/users/${localStorageId}/contributions`)
          : navigate(`/users/login`);
      } else {
        const data = await res.json();
        setContributedData(data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoaddingContributions(false);
    }
  };

  const handleFormattedData = (filterValue) => {
    setFilter(filterValue);

    let filteredContributions = [];

    // modify the type field if added and edited
    for (let i = 0; i < contributedData.length; i++) {
      if (filterValue === "Add & Edit") {
        for (let j = i; j < contributedData.length; j++) {
          if (
            contributedData[i].plugId === contributedData[j].plugId &&
            contributedData[i].type !== contributedData[j].type
          ) {
            filteredContributions.push({
              ...contributedData[i],
              type: "Added & Edtied",
            });
            break;
          }
        }
      } else if (
        filterValue === "All" ||
        filterValue === contributedData[i].type
      ) {
        let plugWasAdded = false;
        for (let j = 0; j < filteredContributions.length; j++) {
          // avoid duplicates
          if (filteredContributions[j].plugId === contributedData[i].plugId) {
            filteredContributions[j].type = "Added & Edited";
            plugWasAdded = true;
            break;
          }
        }
        // push only if no duplicates are found
        if (!plugWasAdded)
          filteredContributions.push({
            ...contributedData[i],
            type: contributedData[i]["type"] + "ed",
          });
      }
    }

    setFormattedData(filteredContributions);
  };

  useEffect(() => {
    handleFormattedData("All");
  }, [contributedData]);

  useEffect(() => {
    fetchUserDistributions();
  }, []);

  return (
    <>
      {loadingContributions ? (
        <Spinner />
      ) : (
        <div className="sub-route-wrapper">
          <div className="contributions-wrapper">
            {/* Empty list */}
            <div
              className={`${
                contributedData.length > 0 && "d-none"
              } empty-sub-route-list-wrapper`}
            >
              <div className="empty-sub-route-list">
                <SvgPencil />
                <span>
                  Plugs you contributed to (by adding or editing) will appear
                  here
                </span>
              </div>
            </div>

            {/* Not empty list */}
            <div
              className={`${
                contributedData.length <= 0 && "d-none"
              } sub-route-list-wrapper`}
            >
              <div className="total-and-filter">
                {/* total */}
                <h2 className="total-header">
                  <strong>Total: {formattedData.length}</strong>
                </h2>

                {/* filter icon */}
                <div
                  className="btn btn-outline-secondary dropdown-toggle filter-icon"
                  data-bs-toggle="dropdown"
                  title="filter what you see"
                >
                  <span className="inner-button-text-type">{filter}</span>
                </div>

                {/* filter drop down */}
                <ul className="dropdown-menu">
                  {["All", "Add", "Edit", "Add & Edit"].map((item) => {
                    return (
                      <li
                        key={item}
                        className="dropdown-item filter-dropdown-item"
                        onClick={() => handleFormattedData(item)}
                      >
                        <span>
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </span>
                        {filter === item && (
                          <span id="check-sign-container">
                            <SvgCheck />
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <ColoredDivider />

              {contributedData.length > 0 && formattedData.length <= 0 && (
                <div className="empty-sub-route-list-wrapper">
                  <div>Plugs you {filter.toLowerCase()} will show here</div>
                </div>
              )}

              <ul
                className={`${
                  formattedData.length <= 0 && "d-none"
                } sub-route-list list-group`}
              >
                {formattedData.map((item, index) => {
                  return (
                    <Link
                      className="list-group-item sub-route-list-item"
                      to={`/plugs/${item.plugId}`}
                      key={index}
                    >
                      <span>{item.plugName}</span>
                      {item.type}
                    </Link>
                  );
                })}
              </ul>

              {/* scroller injection */}
              <Scroller
                parentContainerSelector={".sub-route-list.list-group"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contributions;
