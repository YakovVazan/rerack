import { useContext, useEffect } from "react";
import Context from "../../../../context/Context";
import { localStorageIsOwner } from "../../../../config/localStorage";
import "./DeleteButton.css";
import SvgDelete from "../../../svg/SvgDelete/SvgDelete";

const DeleteButton = () => {
  const contextData = useContext(Context);

  useEffect(() => {
    if (localStorageIsOwner === "false")
      document.getElementById("delete-button").classList.add("d-none");
  }, [localStorageIsOwner]);

  return (
    <div
      id="delete-button"
      className="btn btn-outline-danger"
      title="delete"
      data-bs-toggle={contextData["token"] && "modal"}
      data-bs-target={contextData["token"] && "#deletingModal"}
    >
      <SvgDelete />
    </div>
  );
};

export default DeleteButton;
