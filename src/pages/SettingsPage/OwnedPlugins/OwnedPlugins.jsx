import { useState } from "react";
import SvgTag from "../../../components/svg/SvgTag/SvgTag";
import "../SubRoutes.css";
import Spinner from "../../../components/Common/Spinner/Spinner";

const OwnedPlugins = () => {
  const [ownedPlugins, setOwnedPlugins] = useState([]);
  const [loadingOwnedPlugins, setLoaddingOwnedPlugins] = useState(false); // turn to true

  return (
    <>
      {loadingOwnedPlugins ? (
        <Spinner />
      ) : (
        <div className="sub-route-wrapper">
          {/* Empty list */}
          <div
            className={`${
              ownedPlugins.length > 0 && "d-none"
            } empty-sub-route-list-wrapper`}
          >
            <div className="empty-sub-route-list">
              <SvgTag />
              <span>Plugs you tagged as owned will appear here</span>
            </div>
          </div>

          {/* Not empty list */}
          <div
            className={`${
              ownedPlugins.length <= 0 && "d-none"
            }sub-route-wrapper`}
          >
            <div className="sub-route-list-wrapper">
              <div className="sub-route-list"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OwnedPlugins;
