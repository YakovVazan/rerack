import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToasts from "../../../hooks/useToasts";
import { consts } from "../../../config/constants";
import Spinner from "../../../components/Common/Spinner/Spinner";
import {
  localStorageIsOwner,
  localStorageToken,
} from "../../../config/localStorage";
import "./Activity.css";
import SvgCheck from "../../../components/svg/SvgCheck/SvgCheck";

const Activity = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [activities, setActivities] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [loadingActivity, setLoaddingActivity] = useState(true);

  const fetchUsersActivity = async () => {
    try {
      const res = await fetch(`${consts.baseURL}/users/activity`, {
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        showToast(errorResponse.msg || errorResponse.error);
        console.log(errorResponse);
      } else {
        const data = await res.json();
        setActivities(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoaddingActivity(false);
    }
  };

  // update contents of fomatted data's array
  const handleFormattedData = (item) => {
    setFilter(item);
    setFormattedData(
      activities.flatMap((user) =>
        user.actions
          .filter((action) => item === "All" || action.action === item)
          .map((action) => ({
            userId: user.userId,
            username: user.username,
            plugId: user.plugId,
            plugName: user.plugName,
            action: action,
          }))
      )
    );
  };

  // 
  useEffect(() => {
    setFormattedData(
      activities.flatMap((user) => {
        return user.actions.map((action) => ({
          userId: user.userId,
          username: user.username,
          plugId: user.plugId,
          plugName: user.plugName,
          action: action,
        }));
      })
    );
  }, [activities]);

  // block unauthorized users
  useEffect(() => {
    if (localStorageIsOwner !== "true") {
      navigate("/");
    } else fetchUsersActivity();
  }, []);

  return (
    <>
      {loadingActivity ? (
        <Spinner />
      ) : (
        <div className="sub-route-wrapper">
          <div className="sub-route-list-wrapper">
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
                {["All", "Add", "Edit", "Delete"].map((item) => {
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

            <ul className="sub-route-list list-group">
              {formattedData.map((activiy, index) => {
                return (
                  <li
                    className="list-group-item sub-route-list-item activity-item"
                    key={index}
                  >
                    <span>
                      <Link
                        className="activity-links"
                        to={`/users/${activiy.userId}`}
                      >
                        {activiy.username}
                      </Link>
                      <span>
                        {" " + activiy.action.action.toLowerCase() + "ed "}
                      </span>
                      <Link
                        className="activity-links"
                        to={`/plugs/${activiy["plugId"]}`}
                      >
                        {activiy["plugName"]}
                      </Link>
                      <span>
                        {" at " +
                          new Date(activiy.action.time).toLocaleString()}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Activity;
