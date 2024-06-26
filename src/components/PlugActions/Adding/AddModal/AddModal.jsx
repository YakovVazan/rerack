import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTypes from "../../../../hooks/useTypes";
import useToasts from "../../../../hooks/useToasts";
import SvgCheck from "../../../svg/SvgCheck/SvgCheck";
import { consts } from "../../../../config/constants";
import Spinner from "../../../Common/Spinner/Spinner";
import useCompanies from "../../../../hooks/useCompanies";
import { localStorageToken } from "../../../../config/localStorage";
import "../../../../styles/modals.css";

const AddModal = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const { typesList } = useTypes();
  const { companiesList } = useCompanies();
  const [hovering, setHovering] = useState(false);
  const [formIsFullyFilledUp, setFormIsFullyFilledUp] = useState(false);
  const [newPlug, setNewPlug] = useState({
    name: "",
    company: "",
    type: "",
    src: "",
  });

  // control when submition button is enabled
  useEffect(() => {
    setFormIsFullyFilledUp(
      Object.values(newPlug).every((field) => field.trim() !== "")
    );
  }, [newPlug]);

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

  async function handleSubmit() {
    const res = await fetch(`${consts.baseURL}/plugs/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageToken}`,
      },
      body: JSON.stringify(newPlug),
    });

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
                      className="dropdown-item modal-dropdown-item"
                      onClick={() =>
                        setNewPlug({ ...newPlug, company: company })
                      }
                    >
                      <span className="modal-dropdown-item-content">
                        {company}
                      </span>
                      {newPlug.company === company && (
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
                      className="dropdown-item modal-dropdown-item"
                      onClick={() => setNewPlug({ ...newPlug, type: type })}
                    >
                      <span className="modal-dropdown-item-content">
                        {type}
                      </span>
                      {newPlug.type === type && (
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
