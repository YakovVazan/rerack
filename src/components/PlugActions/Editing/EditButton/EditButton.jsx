import { useContext, useEffect } from "react";
import Context from "../../../../context/Context";
import useForceAuth from "../../../../hooks/useForceAuth";
import { localStorageIsOwner } from "../../../../config/localStorage";
import "./EditButton.css";
import SvgEdit from "../../../svg/SvgEdit/SvgEdit";

const EditButton = () => {
  const forceAuth = useForceAuth();
  const contextData = useContext(Context);

  function handleClick() {
    forceAuth();
  }

  useEffect(() => {
    if (localStorageIsOwner === "true") {
      document.getElementById("edit-button").classList.add("two-buttons-view");
      document
        .getElementById("edit-button")
        .classList.remove("one-button-view");
    } else {
      document.getElementById("edit-button").classList.add("one-button-view");
      document
        .getElementById("edit-button")
        .classList.remove("two-buttons-view");
    }
  }, [localStorageIsOwner]);

  return (
    <div
      id="edit-button"
      className="btn btn-outline-warning"
      title="edit"
      data-bs-toggle={contextData["token"] && "modal"}
      data-bs-target={contextData["token"] && "#editingModal"}
      onClick={handleClick}
    >
      <SvgEdit />
    </div>
  );
};

export default EditButton;
