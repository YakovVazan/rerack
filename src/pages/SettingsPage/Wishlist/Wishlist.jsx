import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToasts from "../../../hooks/useToasts";
import { unfavorPlugin } from "../../../services/favorites";
import { localStorageId } from "../../../config/localStorage";
import useFavoritePlugs from "../../../hooks/useFavoritePlugs";
import SvgHeart from "../../../components/svg/SvgHeart/SvgHeart";
import Spinner from "../../../components/Common/Spinner/Spinner";
import Scroller from "../../../components/Common/Scroller/Scroller";
import SvgHeartBroken from "../../../components/svg/SvgHeartBroken/SvgHeartBroken";
import ColoredDivider from "../../../components/Common/ColoredDivider/ColoredDivider";
import "../SubRoutes.css";

const Wishlist = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const getAllFavorites = useFavoritePlugs();
  const [isLoading, setIsLoading] = useState(true);
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [favoritePlugins, setFavoritePlugins] = useState([]);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    try {
      const data = await getAllFavorites();

      if (!(data instanceof Array)) {
        showToast(data.msg);
        localStorageId
          ? navigate(`/users/${localStorageId}/wishlist`)
          : navigate(`/users/auth/login`);
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
      const res = await unfavorPlugin(plugId);

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

  // update total value
  useEffect(() => {
    setTotal(
      favoritePlugins.filter((f) =>
        f["name"].toLowerCase().includes(searchBoxValue.toLowerCase())
      ).length
    );
  }, [searchBoxValue, favoritePlugins]);

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
            } sub-route-wrapper-container`}
          >
            <div className="total-and-filter">
              <h2 className="total-header">
                <strong>Total: {total || "--"}</strong>
              </h2>
              <div className="input-group search-box-container">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  onInput={(event) => setSearchBoxValue(event.target.value)}
                  value={searchBoxValue}
                  autoFocus
                />
              </div>
            </div>

            <ColoredDivider />

            <div className="sub-route-list-wrapper">
              <ul className="sub-route-list list-group">
                {favoritePlugins.map((item, index) => {
                  return (
                    <Link
                      className={`${
                        !searchBoxValue ||
                        item["name"]
                          .toLowerCase()
                          .includes(searchBoxValue.toLowerCase())
                          ? "list-group-item sub-route-list-item"
                          : "d-none"
                      } `}
                      to={`/plugs/${item.id}`}
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

              {/* Scroller injections */}
              <Scroller parentContainerSelector={".sub-route-list"} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
