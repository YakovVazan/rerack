import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../../../context/Context";
import SvgDelete from "../../../svg/SvgDelete/SvgDelete";
import {
  localStorageIsOwner,
  localStorageLogout,
  localStorageToken,
} from "../../../../config/localStorage";
import "../../../../styles/modals.css";
import useToasts from "../../../../hooks/useToasts";

const DeleteModal = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const contextData = useContext(Context);

  async function handleDelete() {
    const res = await fetch(contextData["deletionModalContents"]["url"], {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageToken}`,
      },
    });

    const response = await res.json();
    if (!res.ok) {
      showToast(
        response?.msg || response.error || "An error occurred while deleting"
      );
    } else {
      showToast(
        `${contextData["deletionModalContents"]["msg"]} deleted successfully`
      );
    }

    if (contextData["deletionModalContents"]["url"].includes("plugs")) {
      contextData.setCurrentPlug({});
      navigate("/");
    } else if (contextData["deletionModalContents"]["url"].includes("users")) {
      if (localStorageIsOwner !== "true") {
        contextData["setToken"]("");
        localStorageLogout();
        navigate("/");
      } else {
        document
          .getElementById(contextData["deletionModalContents"]["id"])
          .remove();
      }
    }
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
            Are you sure you want to delete{" "}
            {contextData["deletionModalContents"]["msg"]}?
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
