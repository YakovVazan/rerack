import { useContext, useEffect } from "react";
import Context from "../../../../context/Context";
import { localStorageIsAdmin } from "../../../../config/localStorage";
import "./DeleteButton.css";

const DeleteButton = () => {
  const contextData = useContext(Context);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const currentPlug = contextData["currentPlug"];

  useEffect(() => {
    contextData["setDeletionModalContents"]({
      url: `${baseURL}/plugs/delete/${currentPlug.id}`,
      msg: currentPlug.name,
    });
  }, [currentPlug]);

  if (localStorageIsAdmin !== null && localStorageIsAdmin === "true") {
    return (
      <div
        id="delete-button"
        className={`btn btn-outline-danger ${
          Object.keys(contextData["currentPlug"]).length === 0 && "disabled"
        }`}
        title="delete"
        data-bs-dismiss="offcanvas"
        data-bs-toggle={contextData["token"] && "modal"}
        data-bs-target={contextData["token"] && "#deletingModal"}
      >
        Delete
      </div>
    );
  } else return <></>;
};

export default DeleteButton;
