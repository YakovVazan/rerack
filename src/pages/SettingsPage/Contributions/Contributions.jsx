import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToasts from "../../../hooks/useToasts";
import { consts } from "../../../config/constants";
import Spinner from "../../../components/Common/Spinner/Spinner";
import SvgCheck from "../../../components/svg/SvgCheck/SvgCheck";
import SvgPencil from "../../../components/svg/SvgPencil/SvgPencil";
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
        setFormattedData(data[0]["contributions"] || []);
        setContributedData(data[0]["contributions"] || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoaddingContributions(false);
    }
  };

  const handleFormattedData = (item) => {
    setFilter(item);

    if (item === "All") {
      setFormattedData(contributedData);
    } else if (item === "Add & Edit") {
      setFormattedData(
        contributedData.filter((x) => {
          const actions = x.actions.map((y) => y.action);
          return actions.includes("Add") && actions.includes("Edit");
        })
      );
    } else {
      setFormattedData(
        contributedData.filter((x) => x.actions.every((y) => y.action === item))
      );
    }
  };

  useEffect(() => {
    fetchUserDistributions();
  }, []);
  console.log(contributedData.length > 0 && formattedData.length <= 0);
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

              <hr />

              <ul
                className={`${
                  formattedData.length <= 0 && "d-none"
                } sub-route-list list-group`}
              >
                {formattedData.map((item, index) => {
                  let actions = [];
                  item.actions.forEach((action) => {
                    !actions.includes(action) && actions.push(action.action);
                  });
                  return (
                    <Link
                      className="list-group-item sub-route-list-item"
                      to={`/plugs/${item.id}`}
                      key={index}
                    >
                      <span>{item.name}</span>
                      {actions.includes("Add") && actions.includes("Edit") ? (
                        <span>Added and Edited</span>
                      ) : actions.includes("Add") ? (
                        <span>Added</span>
                      ) : (
                        actions.includes("Edit") && <span>Edited</span>
                      )}
                    </Link>
                  );
                })}
              </ul>
            </div>

            {contributedData.length > 0 && formattedData.length <= 0 && (
              <div className="empty-sub-route-list-wrapper">
                <div>Plugs you {filter.toLowerCase()} will show here</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Contributions;
