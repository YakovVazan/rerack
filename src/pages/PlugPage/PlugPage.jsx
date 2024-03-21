import { useContext, useEffect } from "react";
import Context from "../../context/Context.jsx";
import { useParams, Navigate } from "react-router-dom";
import usePlugsNames from "../../hooks/usePlugsNames.jsx";
import Spinner from "../../components/Common/Spinner/Spinner.jsx";
import "./PlugPage.css";

const PlugPage = () => {
  const contextData = useContext(Context);
  const { name } = useParams();
  const { plugsNames, currentPlug } = usePlugsNames({ name });

  useEffect(() => {
    if (plugsNames.length !== 0) {
      contextData["setCurrentPlug"](currentPlug);
    }
  });

  return (
    <>
      {plugsNames.length === 0 ? (
        <Spinner />
      ) : plugsNames.includes(name) ? (
        <div className="plug-page-container">
          <div className="card list-item">
            <div className="card-header">
              <h2>
                <b>{currentPlug["name"].toUpperCase()}</b>
              </h2>
            </div>
            <img
              src={currentPlug["src"]}
              className="card-img-top"
              alt={currentPlug["name"]}
            />
          </div>
        </div>
      ) : (
        <Navigate to={"/not-found"} />
      )}
    </>
  );
};

export default PlugPage;
