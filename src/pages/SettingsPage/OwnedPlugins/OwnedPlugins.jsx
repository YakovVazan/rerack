import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useToasts from "../../../hooks/useToasts";
import { consts } from "../../../config/constants";
import useSavedPlugs from "../../../hooks/useSavedPlugs";
import Spinner from "../../../components/Common/Spinner/Spinner";
import SvgTagAdd from "../../../components/svg/SvgTagAdd/SvgTagAdd";
import SvgTagRemove from "../../../components/svg/SvgTagRemove/SvgTagRemove";
import {
  localStorageId,
  localStorageToken,
} from "../../../config/localStorage";
import "../SubRoutes.css";

const OwnedPlugins = () => {
  const { id } = useParams();
  const showToast = useToasts();
  const navigate = useNavigate();
  const getAllSaved = useSavedPlugs();
  const [isLoading, setIsLoading] = useState(true);
  const [ownedPlugins, setOwnedPlugins] = useState([]);

  useEffect(() => {
    getSaved();
  }, []);

  const getSaved = async () => {
    try {
      const data = await getAllSaved();

      if (!(data instanceof Array)) {
        showToast(data.msg);
        localStorageId == id
          ? navigate(`/users/${id}`)
          : navigate(`/users/${localStorageId}`);
      } else {
        setOwnedPlugins(data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsave = async (event, plugId) => {
    event.preventDefault();

    try {
      const res = await fetch(`${consts.baseURL}/plugs/save/${plugId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageToken}`,
        },
        body: JSON.stringify({
          needsToBeAdded: false,
        }),
      });

      const msg = await res.json();
      showToast(msg["msg"]);
      setOwnedPlugins(ownedPlugins.filter((plug) => plug.id !== plugId));
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
              ownedPlugins.length > 0 && "d-none"
            } empty-sub-route-list-wrapper`}
          >
            <div className="empty-sub-route-list">
              <SvgTagAdd />
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
                {ownedPlugins.length != 0 &&
                  ownedPlugins.map((item, index) => {
                    return (
                      <Link
                        className={"list-group-item sub-route-list-item"}
                        to={`/plugs/${item.name
                          .replace(/ /g, "_")
                          .toLowerCase()}`}
                        key={index}
                      >
                        <span>{item.name}</span>
                        <div
                          className="btn btn-outline-success"
                          title="unmark as owned"
                          onClick={(e) => handleUnsave(e, item.id)}
                        >
                          <SvgTagRemove />
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

export default OwnedPlugins;
