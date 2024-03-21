import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../../../context/Context";
import { consts } from "../../../../config/constants";
import { localStorageToken } from "../../../../config/localStorage";
import "../../../../styles/modals.css";
import SvgDelete from "../../../svg/SvgDelete/SvgDelete";

const DeleteModal = () => {
  const navigate = useNavigate();
  const contextData = useContext(Context);
  const currentPlug = contextData["currentPlug"];

  async function handleDelete() {
    const res = await fetch(
      `${consts.baseURL}/plugs/delete/${currentPlug.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageToken}`,
        },
      }
    );

    const response = await res.json();
    if (!res.ok) {
      contextData.setToastVisibility(true);
      contextData.setToastMessage(response?.msg || response.error);
    } else {
      contextData.setToastVisibility(true);
      contextData.setToastMessage(`${currentPlug.name} deleted successfully`);
    }

    contextData.setCurrentPlug({});
    navigate("/");
  }

  return (
    <div className="modal fade" id="deletingModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* header */}
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              <SvgDelete />
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* body */}
          <div className="modal-body">
            Are you sure you want to delete {currentPlug.name}?
          </div>

          {/* footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-primary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              data-bs-dismiss="modal"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
