import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../../../context/Context";
import useToasts from "../../../hooks/useToasts";
import SvgDot from "../../../components/svg/SvgDot/SvgDot";
import { fetchAllReports } from "../../../services/reports";
import SvgInbox from "../../../components/svg/SvgInbox/SvgInbox";
import Spinner from "../../../components/Common/Spinner/Spinner";
import Scroller from "../../../components/Common/Scroller/Scroller";
import SvgArrowRight from "../../../components/svg/SvgArrowRight/SvgArrowRight";
import ColoredDivider from "../../../components/Common/ColoredDivider/ColoredDivider";

const Inbox = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const { setCurrentReport } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (report) => {
    setCurrentReport(report);
    navigate(location.pathname + "/" + report.id);
  };

  const awaitReports = async () => {
    try {
      await fetchAllReports().then((data) => setReports(data));
    } catch (error) {
      showToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    awaitReports();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="sub-route-wrapper">
          <div className="contributions-wrapper">
            {/* Empty list */}
            <div
              className={`${
                reports.length > 0 && "d-none"
              } empty-sub-route-list-wrapper`}
            >
              <div className="empty-sub-route-list">
                <SvgInbox />
                <span>Reports sent by users will appear here</span>
              </div>
            </div>

            {/* Not empty list */}
            <div
              className={`${
                reports.length <= 0 && "d-none"
              } sub-route-list-wrapper`}
            >
              <ul
                className={`${
                  reports.length <= 0 && "d-none"
                } sub-route-list list-group`}
              >
                {reports.map((item, index) => {
                  return (
                    <li
                      className={
                        "list-group-item sub-route-list-item reports-container"
                      }
                      key={index}
                      onClick={() => handleClick(item)}
                    >
                      <span className="report-wrapper">
                        <span className="upper-report">
                          <b className="report-header">
                            {!item?.response && (
                              <span title="issue is open">
                                <SvgDot fill="red" />
                              </span>
                            )}{" "}
                            {item.subject}
                          </b>
                          <small className="report-date">
                            {new Date(item?.requestDate).toLocaleDateString()}
                          </small>
                        </span>
                        <ColoredDivider margin=".5em 0" width="50%" />
                        <p className="report-content">{item.request}</p>
                      </span>
                      <span className="report-arrow">
                        <SvgArrowRight />
                      </span>
                    </li>
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

export default Inbox;
