import { useEffect, useState } from "react";
import useToasts from "../../../../hooks/useToasts";
import { sendReply } from "../../../../services/reports";
import SvgReply from "../../../../components/svg/SvgReply/SvgReply";

const ReplyModal = () => {
  const showToast = useToasts();
  const [replyLength, setReplyLength] = useState(0);
  const [reportData, setReportData] = useState({
    response: "",
  });

  const handleResponseChange = (e) => {
    setReportData({
      ...reportData,
      response: e.target.value,
    });
  };

  const handleResponseSubmit = async () => {
    if (reportData.response === "") {
      showToast("All fields are required");
      return;
    }

    await sendReply(reportData)
      .then(() => showToast("Reply has been submitted"))
      .catch((error) => {
        showToast(error.msg);
      });
  };

  useEffect(() => {
    setReplyLength(reportData.response.length);
  }, [reportData.response]);

  return (
    <div className="modal fade" id="replyModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* header */}
          <div className="modal-header">
            <SvgReply />
          </div>

          {/* body */}
          <div className="modal-body">
            <div className="form-floating">
              <textarea
                type="text"
                name="name"
                id="floatingRequest"
                className="form-control"
                placeholder="Response"
                autoFocus
                value={reportData.response}
                maxLength="255"
                onChange={(e) => handleResponseChange(e)}
              />
              <label htmlFor="floatingRequest">Response</label>
              <span className="request-input">{replyLength}/255</span>
            </div>
          </div>

          {/* footer */}
          <div className="modal-footer new-report-modal-footer">
            <input
              type="button"
              value="cancel"
              className="btn customed-button"
              data-bs-dismiss="modal"
              onClick={() =>
                setReportData({
                  response: "",
                })
              }
            />
            <input
              type="submit"
              value="Submit"
              className="btn customed-button"
              data-bs-dismiss="modal"
              onClick={handleResponseSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
