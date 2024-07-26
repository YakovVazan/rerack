import { useContext, useEffect, useState } from "react";
import SvgFlag from "../../../../components/svg/SvgFlag/SvgFlag";
import "./NewReportModal.css";
import { localStorageId } from "../../../../config/localStorage";
import { sendReport } from "../../../../services/reports";
import useToasts from "../../../../hooks/useToasts";
import Context from "../../../../context/Context";

const NewReportModal = () => {
  const showToast = useToasts();
  const { setCurrentReport } = useContext(Context);
  const [requestLength, setRequestLength] = useState(0);
  const [reportData, setReportData] = useState({
    subject: "",
    request: "",
    senderUserId: localStorageId,
  });

  const handleRequestChange = (e) => {
    setReportData({
      ...reportData,
      request: e.target.value,
    });
  };

  useEffect(() => {
    setRequestLength(reportData.request.length);
  }, [reportData.request]);

  useEffect(() => {
    setReportData({
      ...reportData,
      senderUserId: localStorageId,
    });
  }, [localStorageId]);

  const handleReportSubmit = async () => {
    if (reportData.subject === "" || reportData.request == "") {
      showToast("All fields are required");
      return;
    }

    setCurrentReport({});

    await sendReport(reportData)
      .then(() => showToast("Report has been submitted"))
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
          </div>

          {/* body */}
          <div className="modal-body">
            <div className="form-floating">
              <input
                type="text"
                name="name"
                id="floatingSubject"
                className="form-control"
                placeholder="Subject"
                autoFocus
                value={reportData.subject}
                onChange={(e) =>
                  setReportData({
                    ...reportData,
                    subject: e.target.value,
                  })
                }
              />
              <label htmlFor="floatingSubject">Subject</label>
            </div>

            <div className="form-floating">
              <textarea
                type="text"
                name="name"
                id="floatingRequest"
                className="form-control"
                placeholder="Report"
                autoFocus
                value={reportData.request}
                maxLength="255"
                onChange={(e) => handleRequestChange(e)}
              />
              <label htmlFor="floatingRequest">Report</label>
              <span className="request-input">{requestLength}/255</span>
            </div>
          </div>

          {/* footer */}
          <div className="modal-footer new-report-modal-footer">
            <span>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                checked={reportData.senderUserId != localStorageId}
                onChange={(e) =>
                  setReportData({
                    ...reportData,
                    senderUserId: e.target.checked ? -1 : localStorageId,
                  })
                }
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Send anonymously
              </label>
            </span>
            <span>
              {" "}
              <input
                type="button"
                value="cancel"
                className="btn customed-button"
                data-bs-dismiss="modal"
                onClick={() =>
                  setReportData({
                    subject: "",
                    request: "",
                    senderUserId: localStorageId,
                  })
                }
              />
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
