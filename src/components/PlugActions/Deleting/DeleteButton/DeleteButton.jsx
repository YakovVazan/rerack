import { useContext } from "react";
import Context from "../../../../context/Context";
import { localStorageIsOwner } from "../../../../config/localStorage";
import "./DeleteButton.css";

const DeleteButton = () => {
  const contextData = useContext(Context);

  if (localStorageIsOwner !== null && localStorageIsOwner === "true") {
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
