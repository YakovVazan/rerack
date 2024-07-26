import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useToasts from "../../../hooks/useToasts";
import { fetchReports } from "../../../services/reports";
import SvgFlag from "../../../components/svg/SvgFlag/SvgFlag";
import NewReportButton from "./NewReportButton/NewReportButton";
import Spinner from "../../../components/Common/Spinner/Spinner";
import Scroller from "../../../components/Common/Scroller/Scroller";
import ColoredDivider from "../../../components/Common/ColoredDivider/ColoredDivider";
import "./Reports.css";
import SvgArrowRight from "../../../components/svg/SvgArrowRight/SvgArrowRight";
import SvgDot from "../../../components/svg/SvgDot/SvgDot";
import Context from "../../../context/Context";

const Reports = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const location = useLocation();
  const [reports, setReports] = useState([]);
  const { currentReport, setCurrentReport } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (report) => {
    setCurrentReport(report);
    navigate(location.pathname + "/" + report.id);
  };

  const awaitReports = async () => {
    try {
      await fetchReports(location.pathname.split("/")[2]).then((data) => {
        setReports(data);
        console.log(data);
      });
    } catch (error) {
      showToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    awaitReports();
  }, [currentReport]);

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
                <SvgFlag />
                <span>Reports you send will appear here</span>
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
      <NewReportButton />
    </>
  );
};

export default Reports;
