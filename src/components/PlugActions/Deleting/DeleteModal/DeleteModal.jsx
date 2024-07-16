import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../../../context/Context";
import useToasts from "../../../../hooks/useToasts";
import SvgDelete from "../../../svg/SvgDelete/SvgDelete";
import {
  localStorageIsAdmin,
  localStorageLogout,
  localStorageToken,
} from "../../../../config/localStorage";
import "../../../../styles/modals.css";

const DeleteModal = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const { deletionModalContents, setCurrentPlug, setToken } =
    useContext(Context);

  async function handleDelete() {
    const res = await fetch(deletionModalContents["url"], {
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
      showToast(`${deletionModalContents["msg"]} deleted successfully`);
    }

    if (deletionModalContents["url"].includes("plugs")) {
      setCurrentPlug({});
      navigate("/");
    } else if (deletionModalContents["url"].includes("users")) {
      if (localStorageIsAdmin !== "true") {
        setToken("");
        localStorageLogout();
        navigate("/");
      } else {
        document.getElementById(deletionModalContents["id"]).remove();
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
            Are you sure you want to delete {deletionModalContents["msg"]}?
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
