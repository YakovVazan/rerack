import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useToasts from "../../../hooks/useToasts";
import { consts } from "../../../config/constants";
import useFavoritePlugs from "../../../hooks/useFavoritePlugs";
import {
  localStorageId,
  localStorageToken,
} from "../../../config/localStorage";
import SvgHeart from "../../../components/svg/SvgHeart/SvgHeart";
import Spinner from "../../../components/Common/Spinner/Spinner";
import SvgHeartBroken from "../../../components/svg/SvgHeartBroken/SvgHeartBroken";
import "../SubRoutes.css";

const Wishlist = () => {
  const { id } = useParams();
  const showToast = useToasts();
  const navigate = useNavigate();
  const getAllFavorites = useFavoritePlugs();
  const [isLoading, setIsLoading] = useState(true);
  const [favoritePlugins, setFavoritePlugins] = useState([]);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    try {
      const data = await getAllFavorites();

      if (!(data instanceof Array)) {
        showToast(data.msg);
        localStorageId == id
          ? navigate(`/users/${id}`)
          : navigate(`/users/${localStorageId}`);
      } else {
        setFavoritePlugins(data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfavor = async (event, plugId) => {
    event.preventDefault();

    try {
      const res = await fetch(`${consts.baseURL}/plugs/favor/${plugId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageToken}`,
        },
        body: JSON.stringify({
          needsToBeAdded: false,
        }),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        showToast(errorResponse.msg || errorResponse.error);
      } else {
        const msg = await res.json();
        showToast(msg["msg"]);
        setFavoritePlugins(
          favoritePlugins.filter((plug) => plug.id !== plugId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="sub-route-wrapper">
          {/* Empty list */}
          <div
            className={`${
              favoritePlugins.length > 0 && "d-none"
            } empty-sub-route-list-wrapper`}
          >
            <div className="empty-sub-route-list">
              <SvgHeart />
              <span>Plugs you added to your wishlist will appear here</span>
            </div>
          </div>

          {/* Not empty list */}
          <div
            className={`${
              favoritePlugins.length <= 0 && "d-none"
            } sub-route-wrapper`}
          >
            <div className="sub-route-list-wrapper">
              <ul className="sub-route-list list-group">
                {favoritePlugins.map((item, index) => {
                  return (
                    <Link
                      className="list-group-item sub-route-list-item"
                      to={`/plugs/${item.name
                        .replace(/ /g, "_")
                        .toLowerCase()}`}
                      key={index}
                    >
                      <span>{item.name}</span>
                      <div
                        className="btn btn-outline-danger"
                        title="remove from favorites"
                        onClick={(e) => handleUnfavor(e, item.id)}
                      >
                        <SvgHeartBroken />
                      </div>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
