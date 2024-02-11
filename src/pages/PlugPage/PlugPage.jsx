import { useEffect, useState } from "react";
import { useLocation, useParams, Navigate } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import Spinner from "../../components/Common/Spinner/Spinner.jsx";
import "./PlugPage.css";

const PlugPage = () => {
  const { name } = useParams();
  const location = useLocation();
  const { state } = location;
  const { data, isLoading } = useFetchData();
  const [plugsNames, setPlugsNames] = useState([]);

  useEffect(() => {
    if (!isLoading)
      setPlugsNames(
        data.map((plug) => plug.name.replace(/ /g, "_").toLowerCase())
      );
  }, [isLoading]);

  return (
    <>
      {plugsNames.length === 0 ? (
        <Spinner />
      ) : plugsNames.includes(name) ? (
        <div className="list-item-container">
          <div className="card list-item">
            <img
              src={state["src"]}
              className="card-img-top"
              alt={state["name"]}
            />
            <div className="card-body">
              <h1 className="card-title">{state["name"]}</h1>
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
