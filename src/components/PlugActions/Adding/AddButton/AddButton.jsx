import { useContext } from "react";
import Context from "../../../../context/Context";
import SvgPlus from "../../../svg/SvgPlus/SvgPlus";
import useForceAuth from "../../../../hooks/useForceAuth";
import "./AddButton.css";

const AddButton = () => {
  const forceAuth = useForceAuth();
  const contextData = useContext(Context);

  function handleClick() {
    forceAuth();
  }

  return (
    <div className="input-group">
      <div className="input-group-text">
        <SvgPlus />
      </div>
      <div
        id="add-plug-button"
        className="btn customed-button"
        data-bs-toggle={contextData["token"] && "modal"}
        data-bs-target={contextData["token"] && "#addingModal"}
        data-bs-dismiss="offcanvas"
        onClick={handleClick}
      >
        Add a new plug
      </div>
    </div>
  );
};

export default AddButton;
