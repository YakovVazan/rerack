import { useContext } from "react";
import Context from "../../../../context/Context";
import SvgDelete from "../../../svg/SvgDelete/SvgDelete";
import { localStorageIsOwner } from "../../../../config/localStorage";
import "./DeleteButton.css";

const DeleteButton = () => {
  const contextData = useContext(Context);

  if (localStorageIsOwner !== null && localStorageIsOwner === "true") {
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
  } else return <></>;
};

export default DeleteButton;
