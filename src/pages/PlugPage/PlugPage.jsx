import { useParams, Navigate } from "react-router-dom";
import usePlugsNames from "../../hooks/usePlugsNames.jsx";
import Spinner from "../../components/Common/Spinner/Spinner.jsx";
import EditButton from "../../components/PlugActions/Editing/EditButton/EditButton.jsx";
import "./PlugPage.css";

const PlugPage = () => {
  const { name } = useParams();
  const { plugsNames, currentPlug } = usePlugsNames({ name });

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
              <span className="card-title">
                <u>Name:</u>
                {" " + currentPlug["name"]}
                <br />
                <u>Type:</u> {currentPlug["type"]}
                <br />
                <u>Company:</u> {currentPlug["company"]}
              </span>
              <EditButton />
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
