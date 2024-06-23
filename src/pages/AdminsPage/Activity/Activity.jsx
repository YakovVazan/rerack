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

const Activity = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
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
            <h2 className="total-header">
              <strong>
                Total: {activities.length > 0 && activities.length}
              </strong>
            </h2>
            <ul className="sub-route-list list-group">
              {activities.map((user) =>
                user.actions.map((contribution, index) => (
                  <li
                    className="list-group-item sub-route-list-item activity-item"
                    key={index}
                  >
                    <span>
                      <Link
                        className="activity-links"
                        to={`/users/${user.userId}`}
                      >
                        {user.username}
                      </Link>
                      {" " + contribution.toLowerCase() + "ed "}
                      <Link
                        className="activity-links"
                        to={`/plugs/${user["plugName"]
                          .trim()
                          .replace(/ /g, "_")
                          .toLowerCase()}`}
                      >
                        {user["plugName"]}
                      </Link>
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Activity;
