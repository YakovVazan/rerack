import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SvgX from "../../../svg/SvgX/SvgX";
import useTypes from "../../../../hooks/useTypes";
import useToasts from "../../../../hooks/useToasts";
import SvgCheck from "../../../svg/SvgCheck/SvgCheck";
import Spinner from "../../../Common/Spinner/Spinner";
import useCompanies from "../../../../hooks/useCompanies";
import useDragAndDrop from "../../../../hooks/useDragAndDrop";
import { addNewPlug } from "../../../../services/plugins";

const AddModal = () => {
  const initialPlugValue = {
    name: "",
    company: "",
    type: "",
    src: "",
  };
  const showToast = useToasts();
  const navigate = useNavigate();
  const { typesList } = useTypes();
  const { companiesList } = useCompanies();
  const [formIsFullyFilledUp, setFormIsFullyFilledUp] = useState(false);
  const [newPlug, setNewPlug] = useState(initialPlugValue);
  const {
    hovering,
    isShaking,
    emtpyImageBoxText,
    isMobile,
    handleDragOver,
    handleDragLeave,
    checkDroppedItem,
    showInvalidImageMsg,
    cancelHovering,
  } = useDragAndDrop();

  // control when submition button is enabled
  useEffect(() => {
    setFormIsFullyFilledUp(
      Object.values(newPlug).every((field) => field.trim() !== "")
    );
  }, [newPlug]);

  // catch and inspect the dropped element
  const handleDrop = async (e) => {
    const imageUrl = await checkDroppedItem(e);
    if (imageUrl) {
      setNewPlug((prevPlug) => ({ ...prevPlug, src: imageUrl }));
    } else {
      setNewPlug((prevPlug) => ({ ...prevPlug, src: "" }));
      showInvalidImageMsg();
    }
  };

  // remove image when double clicked
  const removeImage = () => {
    setNewPlug({ ...newPlug, src: "" });
  };

  // reset details
  const handleReset = () => {
    setNewPlug(initialPlugValue);

    cancelHovering();
  };

  // submit the form
  const handleSubmit = async () => {
    const res = await addNewPlug(newPlug);

    const response = JSON.parse(await res.text());
    if (!res.ok) {
      showToast(
        response?.msg || response.error || "An error occurred while adding"
      );
    } else {
      showToast(`${newPlug.name} added successfully`);
      navigate(`/plugs/${response}`);
    }

    handleReset();
  };

  return (
    <div className="modal fade" id="addingModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* header */}
          <div className="modal-header">
            <h1 className="modal-title fs-5">New plug&#39;s details</h1>
            <SvgX dataBsDismiss={"modal"} onClick={handleReset} />
          </div>

          {/* body */}
          <div className="modal-body">
            <div className="input-group mb-3">
              <span className="input-group-text adding-title">Name</span>
              <input
                type="text"
                className="form-control adding-input"
                placeholder="plug's name"
                value={newPlug.name}
                onChange={(e) =>
                  setNewPlug({
                    ...newPlug,
                    name:
                      e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1),
                  })
                }
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text adding-title">Company</span>
              <button
                type="button"
                className="btn dropdown-toggle dropdown-toggle-split adding-input customed-button customed-dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div id="adding-company-title">
                  {newPlug.company || "choose the plug's company"}
                </div>
              </button>
              <ul className="dropdown-menu type-or-comp-list customed-dropdown">
                {companiesList.length > 0 ? (
                  companiesList.map((company, index) => (
                    <li
                      key={index}
                      className="dropdown-item modal-dropdown-item customed-dropdown-item"
                      onClick={() =>
                        setNewPlug({ ...newPlug, company: company })
                      }
                    >
                      <span className="modal-dropdown-item-content">
                        {company}
                      </span>
                      {newPlug.company === company && (
                        <span className="customed-svg">
                          <SvgCheck />
                        </span>
                      )}
                    </li>
                  ))
                ) : (
                  <Spinner />
                )}
              </ul>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text adding-title">Type</span>
              <button
                type="button"
                className="btn dropdown-toggle dropdown-toggle-split adding-input customed-button customed-dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div id="adding-type-title">
                  {newPlug.type || "choose the plug's type"}
                </div>
              </button>
              <ul className="dropdown-menu type-or-comp-list customed-dropdown">
                {typesList.length > 0 ? (
                  typesList.map((type, index) => (
                    <li
                      key={index}
                      className="dropdown-item modal-dropdown-item customed-dropdown-item"
                      onClick={() => setNewPlug({ ...newPlug, type: type })}
                    >
                      <span className="modal-dropdown-item-content">
                        {type}
                      </span>
                      {newPlug.type === type && (
                        <span className="customed-svg">
                          <SvgCheck />
                        </span>
                      )}
                    </li>
                  ))
                ) : (
                  <Spinner />
                )}
              </ul>
            </div>

            {!isMobile() ? (
              <div
                id="image-area"
                className="card"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div
                  id="image-area-body"
                  className="card-body"
                  onDoubleClick={removeImage}
                >
                  {hovering ? (
                    <div id="spinner-for-image">
                      <Spinner />
                    </div>
                  ) : newPlug.src ? (
                    <img id="new-plug-img" src={newPlug.src} alt="" />
                  ) : (
                    <p
                      className={`card-text ${isShaking ? "shake-text" : ""}`}
                      id="image-text"
                    >
                      {emtpyImageBoxText}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="input-group mb-3">
                <span className="input-group-text adding-title">Image</span>
                <input
                  type="text"
                  className="form-control adding-input"
                  placeholder="image's URL"
                  value={newPlug.src}
                  onChange={(e) =>
                    setNewPlug({ ...newPlug, src: e.target.value })
                  }
                />
              </div>
            )}
          </div>

          {/* footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-primary"
              data-bs-dismiss="modal"
              onClick={handleSubmit}
              disabled={!formIsFullyFilledUp}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
