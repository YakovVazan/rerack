import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../../../../context/Context";
import useToasts from "../../../../hooks/useToasts";
import SvgX from "../../../../components/svg/SvgX/SvgX";
import { sendReport } from "../../../../services/reports";
import SvgFlag from "../../../../components/svg/SvgFlag/SvgFlag";
import { localStorageId } from "../../../../config/localStorage";
import "./NewReportModal.css";

const NewReportModal = () => {
  const reportInitialValue = {
    subject: "",
    request: "",
    senderUserId: localStorageId,
  };
  const showToast = useToasts();
  const navigate = useNavigate();
  const { setCurrentReport } = useContext(Context);
  const [requestLength, setRequestLength] = useState(0);
  const [reportData, setReportData] = useState(reportInitialValue);

  const handleReportChange = (key, value) => {
    setReportData({
      ...reportData,
      [key]: value,
    });
  };

  useEffect(() => {
    setRequestLength(reportData.request.length);
  }, [reportData.request]);

  useEffect(() => {
    handleReportChange("senderUserId", localStorageId);
  }, [localStorageId]);

  const handleReportSubmit = async () => {
    if (reportData.subject === "" || reportData.request == "") {
      showToast("All fields are required");
      return;
    }

    setReportData(reportInitialValue);
    setCurrentReport({});

    await sendReport(reportData)
      .then((response) => {
        navigate(`/users/${localStorageId}/reports/${response.id}`);
        showToast("Report has been submitted");
      })
      .catch((error) => {
        showToast(error.msg);
      });
  };

  return (
    <div className="modal fade" id="reportModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* header */}
          <div className="modal-header">
            <SvgFlag />
            <span onClick={() => setReportData(reportInitialValue)}>
              <SvgX dataBsDismiss={"modal"} />
            </span>
          </div>

          {/* body */}
          <div className="modal-body">
            <div className="form-floating">
              <input
                type="text"
                name="subject"
                id="floatingSubject"
                className="form-control"
                placeholder="Subject"
                autoFocus
                value={reportData.subject}
                onChange={(e) =>
                  handleReportChange(
                    e.target.name,
                    e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1)
                  )
                }
              />
              <label htmlFor="floatingSubject">Subject</label>
            </div>

            <div className="form-floating">
              <textarea
                type="text"
                name="request"
                id="floatingRequest"
                className="form-control"
                placeholder="Report"
                autoFocus
                value={reportData.request}
                maxLength="255"
                onChange={(e) =>
                  handleReportChange(e.target.name, e.target.value)
                }
              />
              <label htmlFor="floatingRequest">Report</label>
              <span className="request-input">{requestLength}/255</span>
            </div>
          </div>

          {/* footer */}
          <div className="modal-footer new-report-modal-footer">
            <span>
              <input
                type="submit"
                value="Submit"
                className="btn customed-button"
                data-bs-dismiss="modal"
                onClick={handleReportSubmit}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReportModal;
