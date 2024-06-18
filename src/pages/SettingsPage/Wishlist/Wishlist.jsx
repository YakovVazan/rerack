import { useState } from "react";
import SvgHeart from "../../../components/svg/SvgHeart/SvgHeart";
import Spinner from "../../../components/Common/Spinner/Spinner";
import "../SubRoutes.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loadingWishlist, setLoadingWishlist] = useState(false); // turn to true

  return (
    <>
      {loadingWishlist ? (
        <Spinner />
      ) : (
        <div className="sub-route-wrapper">
          {/* Empty list */}

          <div
            className={`${
              wishlist.length > 0 && "d-none"
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
                wishlist.length <= 0 && "d-none"
            }sub-route-wrapper`}
          >
            <div className="sub-route-list"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
