import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../../context/Context";
import useToasts from "../../../hooks/useToasts";
import { consts } from "../../../config/constants";
import SvgInfo from "../../../components/svg/SvgInfo/SvgInfo";
import Spinner from "../../../components/Common/Spinner/Spinner";
import Scroller from "../../../components/Common/Scroller/Scroller";
import ColoredDivider from "../../../components/Common/ColoredDivider/ColoredDivider";
import {
  localStorageIsOwner,
  localStorageToken,
} from "../../../config/localStorage";
import "../../SettingsPage/SubRoutes.css";
import "./Activity.css";

const Activity = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [activities, setActivities] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const { token, setContributions } = useContext(Context);
  const [searchBoxValue, setSearchBoxValue] = useState("");
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
        showToast(
          errorResponse.msg || errorResponse.error || "Error fetching activity"
        );
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

  const handleContributionsModal = (item) => {
    setContributions(
      activities.filter((x) => {
        return x.plugId === item.plugId;
      })
    );
  };

  // block unauthorized users
  useEffect(() => {
    if (localStorageIsOwner !== "true") {
      navigate("/");
    } else fetchUsersActivity();
  }, []);

  // remove duplicates from contributedData array
  useEffect(() => {
    setFormattedData(
      activities.reduce((acc, item) => {
        if (!acc.some((existingItem) => existingItem.plugId === item.plugId)) {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  }, [activities]);

  // update total value
  useEffect(() => {
    setTotal(
      formattedData.filter((f) =>
        f["plugName"].toLowerCase().includes(searchBoxValue)
      ).length
    );
  }, [searchBoxValue, formattedData]);

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
                <strong>Total: {total}</strong>
              </h2>
              {/* search box */}
              <div className="input-group search-box-container">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  onInput={(event) => setSearchBoxValue(event.target.value)}
                  value={searchBoxValue}
                  autoFocus
                />
              </div>
            </div>

            <ColoredDivider />

            <span id="contributions-with-scroller-container">
              <ul className="sub-route-list list-group">
                {formattedData.map((activiy, index) => {
                  return (
                    <li
                      className={`${
                        !searchBoxValue ||
                        activiy["plugName"]
                          .toLowerCase()
                          .includes(searchBoxValue)
                          ? "list-group-item sub-route-list-item activity-item"
                          : "d-none"
                      } `}
                      key={index}
                    >
                      <span className="activity-item">
                        <span>
                          <Link
                            className="undecorated-link"
                            to={`/users/${activiy.userId}`}
                          >
                            {activiy.username}
                          </Link>
                          <span> contributed to </span>
                          <Link
                            className="undecorated-link"
                            to={`/plugs/${activiy["plugId"]}`}
                          >
                            {activiy["plugName"]}
                          </Link>
                        </span>
                        <span className="time-container-for-activity-page">
                          <span
                            data-bs-toggle={token && "modal"}
                            data-bs-target={token && "#contributionsModal"}
                            data-bs-dismiss="offcanvas"
                            className="btn"
                            onClick={() => handleContributionsModal(activiy)}
                          >
                            <SvgInfo />
                          </span>
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              {/* scroller injection */}
              <Scroller
                parentContainerSelector={
                  "#contributions-with-scroller-container"
                }
              />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Activity;
