import { useContext, useEffect, useState } from "react";
import Context from "../../context/Context.jsx";
import { useParams, Navigate } from "react-router-dom";
import usePlugsNames from "../../hooks/usePlugsNames.jsx";
import Spinner from "../../components/Common/Spinner/Spinner.jsx";
import { localStorageIsOwner } from "../../config/localStorage.js";
import EditButton from "../../components/PlugActions/Editing/EditButton/EditButton.jsx";
import DeleteButton from "../../components/PlugActions/Deleting/DeleteButton/DeleteButton.jsx";
import DescGenButton from "../../components/PlugActions/DescGen/DescGenButton/DescGenButton.jsx";
import "./PlugPage.css";

const PlugPage = () => {
  const contextData = useContext(Context);
  const { name } = useParams();
  const { plugsNames, currentPlug } = usePlugsNames({ name });
  const [descriptionHTML, setDescriptionHTML] = useState("");

  useEffect(() => {
    if (plugsNames.length !== 0) {
      contextData["setCurrentPlug"](currentPlug);
      setDescriptionHTML(currentPlug["description"]);
    }
  });

  return (
    <>
      {plugsNames.length === 0 ? (
        <Spinner />
      ) : plugsNames.includes(name) ? (
        <div className="list-item-container">
          <div className="card list-item">
            <img
              src={currentPlug["src"]}
              className="card-img-top"
              alt={currentPlug["name"]}
            />
            <div id="plug-page-details" className="card-body">
              <div className="upper-card-body">
                <span className="card-title">
                  <u>Name:</u>
                  {" " + currentPlug["name"]}
                  <br />
                  <u>Type:</u> {currentPlug["type"]}
                  <br />
                  <u>Company:</u> {currentPlug["company"]}
                </span>
                <div className="action-buttons">
                  {!currentPlug["description"] && <DescGenButton />}
                  <EditButton />
                  {localStorageIsOwner === "true" && <DeleteButton />}
                </div>
              </div>
              <hr />
              <div
                dangerouslySetInnerHTML={{ __html: descriptionHTML || "--" }}
              />
              <hr />
              <small>Powered by Gemini. Consume responsibly.</small>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={"/not-found"} />
      )}
    </>
  );
};

export default PlugPage;
