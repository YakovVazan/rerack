import { useContext } from "react";
import Context from "../../../../context/Context";
import useForceAuth from "../../../../hooks/useForceAuth";
import { localStorageIsOwner } from "../../../../config/localStorage";
import "./EditButton.css";

const EditButton = () => {
  const forceAuth = useForceAuth();
  const contextData = useContext(Context);

  function handleClick() {
    forceAuth();
  }

  return (
    <div
      id="edit-button"
      className={`btn btn-outline-warning ${
        localStorageIsOwner !== null && localStorageIsOwner === "true"
          ? "two-buttons-view"
          : "one-button-view"
      } ${Object.keys(contextData["currentPlug"]).length === 0 && "disabled"}`}
      title="edit"
      data-bs-dismiss="offcanvas"
      data-bs-toggle={contextData["token"] && "modal"}
      data-bs-target={contextData["token"] && "#editingModal"}
      onClick={handleClick}
    >
      Edit
    </div>
  );
};

export default EditButton;
