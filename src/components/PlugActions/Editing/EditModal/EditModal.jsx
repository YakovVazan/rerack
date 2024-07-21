import { useContext, useEffect, useState } from "react";
import useTypes from "../../../../hooks/useTypes";
import Context from "../../../../context/Context";
import SvgEdit from "../../../svg/SvgEdit/SvgEdit";
import useToasts from "../../../../hooks/useToasts";
import { consts } from "../../../../config/constants";
import Spinner from "../../../Common/Spinner/Spinner";
import SvgCheck from "../../../svg/SvgCheck/SvgCheck";
import useCompanies from "../../../../hooks/useCompanies";
import useDragAndDrop from "../../../../hooks/useDragAndDrop";
import { localStorageToken } from "../../../../config/localStorage";
import "../../../../styles/modals.css";

const EditModal = () => {
  const showToast = useToasts();
  const { typesList } = useTypes();
  const { companiesList } = useCompanies();
  const { currentPlug, setCurrentPlug } = useContext(Context);
  const [formIsFullyFilledUp, setFormIsFullyFilledUp] = useState(false);
  const [upToDatePlug, setUpToDatePlug] = useState({
    name: "",
    company: "",
    type: "",
    src: "",
    price: "",
    link: null,
  });
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

  // initialize input tracking
  useEffect(() => {
    if (currentPlug) setUpToDatePlug(currentPlug);
  }, [currentPlug]);

  // control when submition button is enabled
  useEffect(() => {
    setFormIsFullyFilledUp(
      Object.keys(upToDatePlug)
        .map((key) => {
          return upToDatePlug[key] && upToDatePlug[key] === currentPlug[key];
        })
        .some((value) => value === false)
    );
  }, [upToDatePlug]);

  // catch and inspect the dropped element
  const handleDrop = async (e) => {
    const imageUrl = await checkDroppedItem(e);
    if (imageUrl) {
      setUpToDatePlug({ ...upToDatePlug, src: imageUrl });
    } else {
      setUpToDatePlug((prevPlug) => ({ ...prevPlug, src: "" }));
      showInvalidImageMsg();
    }
  };

  // remove image when double clicked
  const removeImage = () => {
    setUpToDatePlug({ ...upToDatePlug, src: "" });
  };

  // reset details
  const handleReset = () => {
    setUpToDatePlug(currentPlug);

    cancelHovering();
  };

  const handleSubmit = async () => {
    const res = await fetch(`${consts.baseURL}/plugs/edit/${upToDatePlug.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageToken}`,
      },
      body: JSON.stringify(upToDatePlug),
    });

    const response = JSON.parse(await res.text());
    if (!res.ok) {
      showToast(
        response?.msg || response.error || "An error occurred while editing"
      );
    } else {
      showToast(`${upToDatePlug.name} edited successfully`);
      setCurrentPlug(upToDatePlug);
    }

    handleReset();
  };

  return (
    <div className="modal fade" id="editingModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* header */}
          <div className="modal-header">
            <span id="edit-modal-header">
              <SvgEdit />
              <span style={{marginLeft: '.5em'}}>Edit {currentPlug.name}</span>
            </span>
          </div>

          {/* body */}
          <div className="modal-body">
            <div className="input-group mb-3">
              <span className="input-group-text adding-title">Name</span>
              <input
                type="text"
                className="form-control adding-input"
                placeholder="plug's name"
                value={upToDatePlug.name || ""}
                onChange={(e) =>
                  setUpToDatePlug({
                    ...upToDatePlug,
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
                className="btn dropdown-toggle dropdown-toggle-split adding-input customed-button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div id="adding-company-title">
                  {upToDatePlug.company || "choose the plug's company"}
                </div>
              </button>
              <ul className="dropdown-menu type-or-comp-list customed-dropdown">
                {companiesList.length > 0 ? (
                  companiesList.map((company, index) => (
                    <li
                      key={index}
                      className="dropdown-item modal-dropdown-item customed-dropdown-item"
                      onClick={() =>
                        setUpToDatePlug({
                          ...upToDatePlug,
                          company: company,
                        })
                      }
                    >
                      <span className="modal-dropdown-item-content">
                        {company}
                      </span>
                      {upToDatePlug.company === company && (
                        <span>
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
                className="btn dropdown-toggle dropdown-toggle-split adding-input customed-button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div id="adding-type-title">
                  {upToDatePlug.type || "choose the plug's type"}
                </div>
              </button>
              <ul className="dropdown-menu type-or-comp-list customed-dropdown">
                {typesList.length > 0 ? (
                  typesList.map((type, index) => (
                    <li
                      key={index}
                      className="dropdown-item modal-dropdown-item customed-dropdown-item"
                      onClick={() =>
                        setUpToDatePlug({ ...upToDatePlug, type: type })
                      }
                    >
                      <span className="modal-dropdown-item-content">
                        {type}
                      </span>
                      {upToDatePlug.type === type && (
                        <span>
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
                  ) : upToDatePlug.src ? (
                    <img id="new-plug-img" src={upToDatePlug.src} alt="" />
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
                  value={upToDatePlug.src || ""}
                  onChange={(e) =>
                    setUpToDatePlug({
                      ...upToDatePlug,
                      src: e.target.value,
                    })
                  }
                />
              </div>
            )}
          </div>

          {/* footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-warning"
              data-bs-dismiss="modal"
              onClick={handleReset}
            >
              Dismiss
            </button>
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
export default EditModal;
