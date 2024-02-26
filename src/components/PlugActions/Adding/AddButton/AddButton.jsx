import { useContext } from "react";
import Context from "../../../../context/Context";
import "./AddButton.css";

const AddButton = () => {
  const contextData = useContext(Context);

  function forceLogin() {
    if (!contextData["token"]) {
      contextData["setToastVisibility"](true);
      contextData["setToastMessage"](
        "Register & log in to contribute to Rerack"
      );
    }
  }

  return (
    <div className="input-group">
      <div className="input-group-text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
          />
        </svg>
      </div>
      <div
        id="add-plug-button"
        className="btn btn-outline-secondary form-control"
        data-bs-toggle={contextData["token"] && "modal"}
        data-bs-target={contextData["token"] && "#addingModal"}
        data-bs-dismiss="offcanvas"
        onClick={forceLogin}
      >
        Add a new plug to Rerack
      </div>
    </div>
  );
};

export default AddButton;