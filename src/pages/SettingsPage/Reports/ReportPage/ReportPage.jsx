import { useNavigate } from "react-router-dom";
import useNavigation from "../../../../hooks/useNavigation";
import SvgReturn from "../../../../components/svg/SvgReturn/SvgReturn";
import { useContext, useEffect } from "react";
import Context from "../../../../context/Context";
import "./ReportPage.css";
import { getCurrentReport } from "../../../../services/reports";
import SvgDelete from "../../../../components/svg/SvgDelete/SvgDelete";
import { consts } from "../../../../config/constants";
import {
  localStorageId,
  localStorageToken,
} from "../../../../config/localStorage";

const ReportPage = () => {
  const navigate = useNavigate();
  const { urlToArray } = useNavigation();
  const { currentReport, setCurrentReport, setDeletionModalContents } =
    useContext(Context);

  const handleBackClick = () => {
    navigate("/" + urlToArray(location.pathname).slice(0, -1).join("/"));
  };

  const handleReportDelete = () => {
    setDeletionModalContents({
      url: `${consts.baseURL}/users/reports/delete/${currentReport.id}`,
      msg: "the report",
      id: `${localStorageId}`,
    });
  };

  const awaitCurrentReport = async () => {
    setCurrentReport(
      (await getCurrentReport(urlToArray(location.pathname).at(-1)))[0]
    );
  };

  useEffect(() => {
    awaitCurrentReport();
  }, []);

  return (
    <>
      <div className="sub-route-wrapper">
        <div className="contributions-wrapper">
          <span className="report-letter-back" onClick={handleBackClick}>
            <SvgReturn />
            Reports
          </span>
          <div className="report-letter-container">
            <div className="report-letter-header">
              <h3>
                <strong>{currentReport.subject}</strong>
              </h3>
            </div>
            <div className="report-letter-date">
              <p>
                Date: {new Date(currentReport.requestDate).toLocaleDateString()}
              </p>
            </div>
            <div className="report-letter-content">
              <p>{currentReport.request}</p>
            </div>
            <div className="report-letter-footer">
              <small>
                {currentReport.response
                  ? "Report was close"
                  : "Report still open"}
              </small>
              <div
                className="btn btn-outline-danger"
                data-bs-dismiss="offcanvas"
                data-bs-toggle={localStorageToken && "modal"}
                data-bs-target={localStorageToken && "#deletingModal"}
                onClick={handleReportDelete}
              >
                <SvgDelete />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
