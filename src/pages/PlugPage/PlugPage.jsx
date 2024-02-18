import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import Spinner from "../../components/Common/Spinner/Spinner.jsx";
import "./PlugPage.css";

const PlugPage = () => {
  const { name } = useParams();
  const { data, isLoading } = useFetchData();
  const [currentPlug, setCurrentPlug] = useState({});
  const [plugsNames, setPlugsNames] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      Object.keys(data).forEach((key) => {
        setPlugsNames((prevPlugsNames) => [
          ...prevPlugsNames,
          data[key].name.replace(/ /g, "_").toLowerCase(),
        ]);

        if (data[key].name.replace(/ /g, "_").toLowerCase() === name)
          setCurrentPlug(data[key]);
      });
    }
  }, [isLoading]);

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
            <div className="card-body">
              <h1 className="card-title">{currentPlug["name"]}</h1>
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
