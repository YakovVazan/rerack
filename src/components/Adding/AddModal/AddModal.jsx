import { useState } from "react";
import useTypes from "../../../hooks/useTypes";
import Spinner from "../../Common/Spinner/Spinner";
import useCompanies from "../../../hooks/useCompanies";
import "./AddModal.css";

const AddModal = () => {
  const { typesList } = useTypes();
  const { companiesList } = useCompanies();
  const [hovering, setHovering] = useState(false);
  const [newPlug, setNewPlug] = useState({
    name: "",
    company: "",
    type: "",
    src: "",
  });
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  function handleDragOver(e) {
    e.preventDefault();
    setHovering(true);
  }

  function handleDragLeave(e) {
    // Check if the drag event is leaving the drop area itself, not its children
    if (
      !e.relatedTarget ||
      e.relatedTarget === document ||
      !e.currentTarget.contains(e.relatedTarget)
    ) {
      setHovering(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();

    const urlRegex = /^https?:\/\/.+/i;
    const droppedData = e.dataTransfer.getData("URL");
    const imageUrl = droppedData.includes("imgurl=")
      ? decodeURIComponent(droppedData.split("imgurl=")[1].split("&")[0])
      : droppedData;
    console.log(imageUrl);

    if (urlRegex.test(droppedData)) {
      setNewPlug({ ...newPlug, src: imageUrl });
    } else {
      console.log("Invalid dropped data:", droppedData);
    }

    setHovering(false);
  }

  function removeImage() {
    setNewPlug({ ...newPlug, src: "" });
  }

  function handleReset() {
    setNewPlug({
      name: "",
      company: "",
      type: "",
      src: "",
    });

    setHovering(false);
  }

  return (
    <div className="modal fade" id="addingModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* header */}
          <div className="modal-header">
            <h1 className="modal-title fs-5">New plug&#39;s details</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
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
                  setNewPlug({ ...newPlug, name: e.target.value })
                }
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text adding-title">Company</span>
              <button
                type="button"
                className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split adding-input"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div id="adding-company-title">
                  {newPlug.company || "choose the plug's company"}
                </div>
              </button>
              <ul className="dropdown-menu type-or-comp-list">
                {companiesList.length > 0 ? (
                  companiesList.map((company, index) => (
                    <li
                      key={index}
                      className="dropdown-item"
                      onClick={() =>
                        setNewPlug({ ...newPlug, company: company })
                      }
                    >
                      {company}
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
                className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split adding-input"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div id="adding-type-title">
                  {newPlug.type || "choose the plug's type"}
                </div>
              </button>
              <ul className="dropdown-menu type-or-comp-list">
                {typesList.length > 0 ? (
                  typesList.map((type, index) => (
                    <li
                      key={index}
                      className="dropdown-item"
                      onClick={() => setNewPlug({ ...newPlug, type: type })}
                    >
                      {type}
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
                <div id="image-area-body" className="card-body">
                  {hovering ? (
                    <div id="spinner-for-image">
                      <Spinner />
                    </div>
                  ) : newPlug.src ? (
                    <img
                      id="new-plug-img"
                      src={newPlug.src}
                      alt=""
                      onDoubleClick={removeImage}
                    />
                  ) : (
                    <p className="card-text">Drag and drop an image URL</p>
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
              className="btn btn-outline-warning"
              data-bs-dismiss="modal"
              onClick={handleReset}
            >
              Dismiss
            </button>
            <button type="button" className="btn btn-outline-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
