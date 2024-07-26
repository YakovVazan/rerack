import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Context from "../../../../context/Context";
import useToasts from "../../../../hooks/useToasts";
import { consts } from "../../../../config/constants";
import useNavigation from "../../../../hooks/useNavigation";
import { getCurrentReport } from "../../../../services/reports";
import SvgReply from "../../../../components/svg/SvgReply/SvgReply";
import SvgDelete from "../../../../components/svg/SvgDelete/SvgDelete";
import SvgReturn from "../../../../components/svg/SvgReturn/SvgReturn";
import {
  localStorageId,
  localStorageToken,
} from "../../../../config/localStorage";
import "./ReportPage.css";

const ReportPage = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const { urlToArray } = useNavigation();
  const { currentReport, setCurrentReport, setDeletionModalContents } =
    useContext(Context);

  const isReportNotInbox = () => {
    return !urlToArray(location.pathname).includes("inbox");
  };

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
    try {
      setCurrentReport(
        await getCurrentReport(urlToArray(location.pathname).at(-1))
      );
    } catch (error) {
      showToast(error.msg);
    }
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
            {isReportNotInbox() ? "Reports" : "Inbox"}
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
              {!isReportNotInbox() && (
                <span>
                  Reported by:{" "}
                  <Link to={"/users/" + currentReport?.senderUserId}>
                    {currentReport?.senderUsername}
                  </Link>
                </span>
              )}
            </div>
            <div className="report-letter-footer">
              <small>
                {currentReport.response
                  ? "Report was close"
                  : "Report still open"}
              </small>
              <div
                className={`${
                  isReportNotInbox() && "d-none"
                } btn btn-outline-primary`}
                data-bs-dismiss="offcanvas"
                data-bs-toggle={localStorageToken && "modal"}
                data-bs-target={localStorageToken && "#deletingModal"}
                onClick={handleReportDelete}
              >
                <SvgReply />
              </div>
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
