import { useContext, useEffect, useState } from "react";
import Context from "../../context/Context.jsx";
import useToasts from "../../hooks/useToasts.jsx";
import { consts } from "../../config/constants.js";
import { useParams, Navigate } from "react-router-dom";
import useForceAuth from "../../hooks/useForceAuth.jsx";
import useSavedPlugs from "../../hooks/useSavedPlugs.jsx";
import usePlugsNames from "../../hooks/usePlugsNames.jsx";
import SvgTag from "../../components/svg/SvgTag/SvgTag.jsx";
import useFavoritePlugs from "../../hooks/useFavoritePlugs.jsx";
import Spinner from "../../components/Common/Spinner/Spinner.jsx";
import SvgHeart from "../../components/svg/SvgHeart/SvgHeart.jsx";
import { localStorageToken } from "../../config/localStorage.js";
import "./PlugPage.css";

const PlugPage = () => {
  const { name } = useParams();
  const showToast = useToasts();
  const forceAuth = useForceAuth();
  const getAllSaved = useSavedPlugs();
  const contextData = useContext(Context);
  const getAllFavorites = useFavoritePlugs();
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [alreadyFavorited, setAlreadyFavorited] = useState(false);
  const { plugsNames, currentPlug } = usePlugsNames({ name });

  useEffect(() => {
    if (plugsNames.length !== 0) {
      contextData["setCurrentPlug"](currentPlug);
    }

    getFavorites();
    getSaved();
  }, [plugsNames]);

  const getFavorites = async () => {
    const data = await getAllFavorites();

    data.forEach((item) => {
      if (item["plugId"] == currentPlug["id"]) {
        setAlreadyFavorited(true);
        return;
      }
    });
  };

  const getSaved = async () => {
    const data = await getAllSaved();

    data.forEach((item) => {
      if (item["plugId"] == currentPlug["id"]) {
        setAlreadySaved(true);
        return;
      }
    });
  };

  const handleToast = (msg) => {
    forceAuth() && showToast(msg);
  };

  const handleSelections = async (type, plugId) => {
    try {
      const res = await fetch(`${consts.baseURL}/plugs/${type}/${plugId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageToken}`,
        },
        body: JSON.stringify({
          needsToBeAdded: type === "favore" ? alreadyFavorited : alreadySaved,
        }),
      });

      const msg = await res.json();
      handleToast(msg["msg"]);
    } catch (error) {
      console.error(error);
    }
  };

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
            <div className="card-body plug-tags">
              <div
                className={`btn btn-outline-danger ${
                  alreadyFavorited && "active"
                }`}
                title={
                  alreadyFavorited ? "remove from wishlist" : "add to wishlist"
                }
                onClick={() => handleSelections("favore", currentPlug["id"])}
              >
                <SvgHeart />
              </div>
              <div
                className={`btn btn-outline-success ${
                  alreadySaved && "active"
                }`}
                title={alreadySaved ? "unmark as owned" : "mark as owned"}
                onClick={() => handleSelections("save", currentPlug["id"])}
              >
                <SvgTag />
              </div>
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
