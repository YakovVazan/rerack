import { useContext, useEffect, useState } from "react";
import useToasts from "../../../../hooks/useToasts";
import SvgX from "../../../../components/svg/SvgX/SvgX";
import { sendReply } from "../../../../services/reports";
import SvgReply from "../../../../components/svg/SvgReply/SvgReply";
import Context from "../../../../context/Context";
import { useNavigate } from "react-router-dom";

const ReplyModal = () => {
  const replyInitialValue = {
    response: "",
  };
  const showToast = useToasts();
  const navigate = useNavigate();
  const { setCurrentReport } = useContext(Context);
  const [replyLength, setReplyLength] = useState(0);
  const [reportData, setReportData] = useState(replyInitialValue);

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

    setCurrentReport({});

    await sendReply(reportData)
      .then(() => {
        showToast("Reply has been submitted");
        navigate('/users/dashboard/inbox');
      })
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
            <SvgX
              dataBsDismiss={"modal"}
              onClick={() => setReportData(replyInitialValue)}
            />
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
