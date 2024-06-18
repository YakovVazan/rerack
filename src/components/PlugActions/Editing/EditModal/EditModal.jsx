import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useTypes from "../../../../hooks/useTypes";
import Context from "../../../../context/Context";
import SvgEdit from "../../../svg/SvgEdit/SvgEdit";
import useToasts from "../../../../hooks/useToasts";
import { consts } from "../../../../config/constants";
import Spinner from "../../../Common/Spinner/Spinner";
import SvgCheck from "../../../svg/SvgCheck/SvgCheck";
import useCompanies from "../../../../hooks/useCompanies";
import { localStorageToken } from "../../../../config/localStorage";
import "../../../../styles/modals.css";

const EditModal = () => {
  const navigate = useNavigate();
  const showToast = useToasts();
  const contextData = useContext(Context);
  const currentPlug = contextData["currentPlug"];
  const { typesList } = useTypes();
  const { companiesList } = useCompanies();
  const [hovering, setHovering] = useState(false);
  const [formIsFullyFilledUp, setFormIsFullyFilledUp] = useState(false);
  const [upToDatePlug, setUpToDatePlug] = useState({
    name: "",
    company: "",
    type: "",
    src: "",
  });

  useEffect(() => {
    if (currentPlug) setUpToDatePlug(currentPlug);
  }, [currentPlug]);

  // control when submition button is enabled
  useEffect(() => {
    setFormIsFullyFilledUp(
      Object.values(upToDatePlug).every(
        (field) =>
          typeof field !== "string" ||
          (typeof field === "string" && field.trim() !== "")
      ) &&
        Object.keys(upToDatePlug)
          .map((key) => {
            return upToDatePlug[key] === currentPlug[key];
          })
          .some((value) => value === false)
    );
  }, [upToDatePlug]);

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
      setUpToDatePlug({ ...upToDatePlug, src: imageUrl });
    } else {
      console.log("Invalid dropped data:", droppedData);
    }

    setHovering(false);
  }

  function removeImage() {
    setUpToDatePlug({ ...upToDatePlug, src: "" });
  }

  function handleReset() {
    setUpToDatePlug(currentPlug);

    setHovering(false);
  }

  async function handleSubmit() {
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
      navigate("/");
    }

    handleReset();
  }

  return (
    <div className="modal fade" id="editingModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* header */}
          <div className="modal-header">
            <SvgEdit />
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
                className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split adding-input"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div id="adding-company-title">
                  {upToDatePlug.company || "choose the plug's company"}
                </div>
              </button>
              <ul className="dropdown-menu type-or-comp-list">
                {companiesList.length > 0 ? (
                  companiesList.map((company, index) => (
                    <li
                      key={index}
                      className="dropdown-item modal-dropdown-item"
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
                className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split adding-input"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div id="adding-type-title">
                  {upToDatePlug.type || "choose the plug's type"}
                </div>
              </button>
              <ul className="dropdown-menu type-or-comp-list">
                {typesList.length > 0 ? (
                  typesList.map((type, index) => (
                    <li
                      key={index}
                      className="dropdown-item modal-dropdown-item"
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
                <div id="image-area-body" className="card-body">
                  {hovering ? (
                    <div id="spinner-for-image">
                      <Spinner />
                    </div>
                  ) : upToDatePlug.src ? (
                    <img
                      id="new-plug-img"
                      src={upToDatePlug.src}
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
