import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../../context/Context";
import useToasts from "../../../hooks/useToasts";
import Spinner from "../../../components/Common/Spinner/Spinner";
import { localStorageIsAdmin } from "../../../config/localStorage";
import Scroller from "../../../components/Common/Scroller/Scroller";
import { getAllContributions } from "../../../services/contributions";
import SvgInfoSquare from "../../../components/svg/SvgInfoSquare/SvgInfoSquare";
import ColoredDivider from "../../../components/Common/ColoredDivider/ColoredDivider";
import "./Activity.css";

const Activity = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [activities, setActivities] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const { token, setActivitiesHistory } = useContext(Context);
  const [loadingActivity, setLoaddingActivity] = useState(true);

  const fetchUsersActivity = async () => {
    try {
      const res = await getAllContributions();

      if (!res.ok) {
        const errorResponse = await res.json();
        const responseText =
          errorResponse.msg || errorResponse.error || "Error fetching activity";
        showToast(responseText);
        throw new Error(responseText);
      } else {
        const data = await res.json();
        setActivities(data);
      }
    } catch (error) {
      navigate("/");
    } finally {
      setLoaddingActivity(false);
    }
  };

  const handleContributionsModal = (item) => {
    setActivitiesHistory(
      activities.filter((x) => {
        return x.plugId === item.plugId;
      })
    );
  };

  // block unauthorized users
  useEffect(() => {
    if (localStorageIsAdmin !== "true") {
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
        f["plugName"].toLowerCase().includes(searchBoxValue.toLowerCase())
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
                <strong>Total: {total || "--"}</strong>
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
                          .includes(searchBoxValue.toLowerCase())
                          ? "list-group-item sub-route-list-item activity-item"
                          : "d-none"
                      } `}
                      key={index}
                    >
                      <span className="activity-item">
                        <span>
                          <Link
                            className="undecorated-link"
                            to={`/plugs/${activiy["plugId"]}`}
                          >
                            {activiy["plugName"]}
                          </Link>
                        </span>
                        <span className="info-container-for-activity-page">
                          <div
                            data-bs-toggle={token && "modal"}
                            data-bs-target={token && "#activitiesModal"}
                            data-bs-dismiss="offcanvas"
                            className="btn customed-svg-button"
                            onClick={() => handleContributionsModal(activiy)}
                          >
                            <SvgInfoSquare />
                          </div>
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
