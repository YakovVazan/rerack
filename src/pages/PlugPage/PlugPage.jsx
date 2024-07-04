import { useContext, useEffect, useState } from "react";
import Context from "../../context/Context.jsx";
import usePlugs from "../../hooks/usePlugs.jsx";
import useToasts from "../../hooks/useToasts.jsx";
import { consts } from "../../config/constants.js";
import { useParams, Navigate, Link } from "react-router-dom";
import useForceAuth from "../../hooks/useForceAuth.jsx";
import useSavedPlugs from "../../hooks/useSavedPlugs.jsx";
import useFavoritePlugs from "../../hooks/useFavoritePlugs.jsx";
import {
  localStorageId,
  localStorageToken,
} from "../../config/localStorage.js";
import Spinner from "../../components/Common/Spinner/Spinner.jsx";
import SvgHeart from "../../components/svg/SvgHeart/SvgHeart.jsx";
import SvgTagAdd from "../../components/svg/SvgTagAdd/SvgTagAdd.jsx";
import SvgTagRemove from "../../components/svg/SvgTagRemove/SvgTagRemove.jsx";
import SvgHeartBroken from "../../components/svg/SvgHeartBroken/SvgHeartBroken.jsx";
import "./PlugPage.css";

const PlugPage = () => {
  const { plugId } = useParams();
  const showToast = useToasts();
  const forceAuth = useForceAuth();
  const getAllSaved = useSavedPlugs();
  const contextData = useContext(Context);
  const getAllFavorites = useFavoritePlugs();
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [alreadyFavorited, setAlreadyFavorited] = useState(false);
  const { plugsNames, plugsIds, currentPlug } = usePlugs({ plugId });

  useEffect(() => {
    if (plugsNames.length !== 0) {
      contextData["setCurrentPlug"](currentPlug);
    }

    if (localStorageToken) {
      getFavorites();
      getSaved();
    }
  }, [plugsNames]);

  const getFavorites = async () => {
    const data = await getAllFavorites();

    data.forEach((item) => {
      if (item["id"] && item["id"] == currentPlug["id"]) {
        setAlreadyFavorited(true);
        return;
      }
    });
  };

  const getSaved = async () => {
    const data = await getAllSaved();

    data.forEach((item) => {
      if (item && item["id"] && item["id"] == currentPlug["id"]) {
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
          needsToBeAdded: type === "favor" ? !alreadyFavorited : !alreadySaved,
        }),
      });

      // show proper toast with link
      handleToast(createProperToastContent(await res.json()));

      if (res.ok) {
        if (type === "favor") {
          setAlreadyFavorited(!alreadyFavorited);
        } else {
          setAlreadySaved(!alreadySaved);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createProperToastContent = (response) => {
    // define links to wishlist and saved
    const links = {
      wishlist: `/users/${localStorageId}/wishlist`,
      owned_plugins: `/users/${localStorageId}/owned_plugins`,
    };

    // define messages for successful selections
    const messages = {
      favored: (
        <span>
          plug added to your <Link to={links.wishlist}>wishlist</Link>
        </span>
      ),
      unfavored: (
        <span>
          plug removed from your <Link to={links.wishlist}>wishlist</Link>
        </span>
      ),
      saved: (
        <span>
          plug marked as <Link to={links.owned_plugins}>saved</Link>
        </span>
      ),
      unsaved: (
        <span>
          plug unmarked as <Link to={links.owned_plugins}>saved</Link>
        </span>
      ),
    };

    return messages[response["msg"]] || "";
  };

  return (
    <>
      {plugsNames.length === 0 ? (
        <Spinner />
      ) : plugsIds.includes(+plugId) ? (
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
                className="btn btn-outline-danger"
                title={
                  alreadyFavorited ? "remove from wishlist" : "add to wishlist"
                }
                onClick={() => handleSelections("favor", currentPlug["id"])}
              >
                {!alreadyFavorited ? <SvgHeart /> : <SvgHeartBroken />}
              </div>
              <div
                className="btn btn-outline-success"
                title={alreadySaved ? "unmark as owned" : "mark as owned"}
                onClick={() => handleSelections("save", currentPlug["id"])}
              >
                {!alreadySaved ? <SvgTagAdd /> : <SvgTagRemove />}
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
