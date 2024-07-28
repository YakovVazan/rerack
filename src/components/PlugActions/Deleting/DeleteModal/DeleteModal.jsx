import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SvgX from "../../../svg/SvgX/SvgX";
import Context from "../../../../context/Context";
import useToasts from "../../../../hooks/useToasts";
import SvgDelete from "../../../svg/SvgDelete/SvgDelete";
import useNavigation from "../../../../hooks/useNavigation";
import { deleteContent } from "../../../../services/delete";
import {
  localStorageId,
  localStorageIsAdmin,
  localStorageLogout,
} from "../../../../config/localStorage";

const DeleteModal = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const { isAdminPage } = useNavigation();
  const { deletionModalContents, setCurrentPlug, setToken } =
    useContext(Context);

  async function handleDelete() {
    const res = await deleteContent(deletionModalContents["url"]);

    if (!res.ok) {
      const response = await res.json();
      showToast(
        response?.msg || response.error || "An error occurred while deleting"
      );
      return;
    } else {
      showToast(`${deletionModalContents["msg"]} deleted successfully`);
    }

    if (deletionModalContents["url"].includes("plugs")) {
      setCurrentPlug({});
      navigate("/");
    } else if (location.pathname.includes("reports")) {
      navigate(`/users/${localStorageId}/reports`);
    } else if (location.pathname.includes("inbox")) {
      navigate("/users/dashboard/inbox");
    } else if (deletionModalContents["url"].includes("users")) {
      if (
        localStorageIsAdmin !== "true" ||
        (isAdminPage && deletionModalContents["id"] == localStorageId)
      ) {
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
              <SvgDelete fill="#dc3545" />
            </h1>
            <SvgX dataBsDismiss={"modal"} />
          </div>

          {/* body */}
          <div className="modal-body">
            Are you sure you want to delete {deletionModalContents["msg"]}?
          </div>

          {/* footer */}
          <div className="modal-footer">
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
