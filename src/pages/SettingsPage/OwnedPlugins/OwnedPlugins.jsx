import { useEffect, useState } from "react";
import SvgTag from "../../../components/svg/SvgTag/SvgTag";
import "../SubRoutes.css";
import Spinner from "../../../components/Common/Spinner/Spinner";
import useSavedPlugs from "../../../hooks/useSavedPlugs";
import { Link } from "react-router-dom";

const OwnedPlugins = () => {
  const getAllSaved = useSavedPlugs();
  const [isLoading, setIsLoading] = useState(true);
  const [ownedPlugins, setOwnedPlugins] = useState([]);

  useEffect(() => {
    getSaved();
  }, []);

  const getSaved = async () => {
    try {
      const data = await getAllSaved();
      setOwnedPlugins(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
            } sub-route-wrapper`}
          >
            <div className="sub-route-list-wrapper">
            <ul className="sub-route-list list-group">
              {ownedPlugins.map((item, index) => {
                return (
                  <Link
                    className="list-group-item sub-route-list-item"
                    to={`/plugs/${item.name.replace(/ /g, "_").toLowerCase()}`}
                    key={index}
                  >
                    <span>{item.name}</span>
                    {/* {item.actions.includes("Add") &&
                    item.actions.includes("Edit") ? (
                      <span>Added and Edited</span>
                    ) : item.actions.includes("Add") ? (
                      <span>Added</span>
                    ) : (
                      item.actions.includes("Edit") && <span>Edited</span>
                    )} */}
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

export default OwnedPlugins;
