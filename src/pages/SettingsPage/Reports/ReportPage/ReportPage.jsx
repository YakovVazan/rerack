import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Context from "../../../../context/Context";
import useToasts from "../../../../hooks/useToasts";
import useNavigation from "../../../../hooks/useNavigation";
import { getCurrentReport } from "../../../../services/reports";
import SvgReply from "../../../../components/svg/SvgReply/SvgReply";
import SvgDelete from "../../../../components/svg/SvgDelete/SvgDelete";
import SvgReturn from "../../../../components/svg/SvgReturn/SvgReturn";
import ColoredDivider from "../../../../components/Common/ColoredDivider/ColoredDivider";
import {
  localStorageId,
  localStorageToken,
} from "../../../../config/localStorage";
import "./ReportPage.css";

const ReportPage = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { urlToArray, isReportNotInbox } = useNavigation();
  const { currentReport, setCurrentReport, setDeletionModalContents } =
    useContext(Context);

  const handleBackClick = () => {
    navigate("/" + urlToArray(location.pathname).slice(0, -1).join("/"));
  };

  const handleReportDelete = () => {
    setDeletionModalContents({
      url: `${baseURL}/users/reports/delete/${currentReport.id}`,
      msg: "report",
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
          <div style={{ paddingBottom: "1em" }}>
            {" "}
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
                  Date:{" "}
                  {new Date(currentReport.requestDate).toLocaleDateString()}
                </p>
              </div>
              <div className="report-letter-content">
                <p>
                  <b>Report:</b> {currentReport.request}
                </p>
                {!isReportNotInbox() && (
                  <p>
                    Reported by:{" "}
                    <Link to={"/users/" + currentReport?.senderUserId}>
                      {currentReport?.senderUsername}
                    </Link>
                  </p>
                )}
                {currentReport.response && (
                  <>
                    <ColoredDivider />
                    <p>
                      <b>Reply:</b> {currentReport.response}
                    </p>
                  </>
                )}
                {!isReportNotInbox() && currentReport.response && (
                  <p>
                    Replied by:{" "}
                    <Link to={"/users/" + currentReport?.adminUserId}>
                      {currentReport?.adminUsername}
                    </Link>
                  </p>
                )}
              </div>
              <div className="report-letter-footer">
                <small>
                  {currentReport.response
                    ? `Report was close at ${new Date(
                        currentReport.responseDate
                      ).toLocaleDateString()}`
                    : "Report still open"}
                </small>
                <div
                  className={`${
                    (isReportNotInbox() || currentReport.response) && "d-none"
                  } btn btn-outline-success`}
                  data-bs-dismiss="offcanvas"
                  data-bs-toggle={localStorageToken && "modal"}
                  data-bs-target={localStorageToken && "#replyModal"}
                >
                  <SvgReply />
                </div>
                {((isReportNotInbox() && !currentReport.response) ||
                  !isReportNotInbox()) && (
                  <div
                    className="btn btn-outline-danger"
                    data-bs-dismiss="offcanvas"
                    data-bs-toggle={localStorageToken && "modal"}
                    data-bs-target={localStorageToken && "#deletingModal"}
                    onClick={handleReportDelete}
                  >
                    <SvgDelete />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
