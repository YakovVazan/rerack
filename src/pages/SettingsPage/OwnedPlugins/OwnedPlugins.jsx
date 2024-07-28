import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToasts from "../../../hooks/useToasts";
import { consts } from "../../../config/constants";
import useSavedPlugs from "../../../hooks/useSavedPlugs";
import Spinner from "../../../components/Common/Spinner/Spinner";
import SvgTagAdd from "../../../components/svg/SvgTagAdd/SvgTagAdd";
import Scroller from "../../../components/Common/Scroller/Scroller";
import SvgTagRemove from "../../../components/svg/SvgTagRemove/SvgTagRemove";
import ColoredDivider from "../../../components/Common/ColoredDivider/ColoredDivider";
import {
  localStorageId,
  localStorageToken,
} from "../../../config/localStorage";
import "../SubRoutes.css";

const OwnedPlugins = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const getAllSaved = useSavedPlugs();
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [ownedPlugins, setOwnedPlugins] = useState([]);
  const [searchBoxValue, setSearchBoxValue] = useState("");

  useEffect(() => {
    getSaved();
  }, []);

  const getSaved = async () => {
    try {
      const data = await getAllSaved();

      if (!(data instanceof Array)) {
        showToast(data.msg);
        localStorageId
          ? navigate(`/users/${localStorageId}/owned_plugins`)
          : navigate(`/users/auth/login`);
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

  // update total value
  useEffect(() => {
    setTotal(
      ownedPlugins.filter((f) =>
        f["name"].toLowerCase().includes(searchBoxValue)
      ).length
    );
  }, [searchBoxValue, ownedPlugins]);

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
                {ownedPlugins.length != 0 &&
                  ownedPlugins.map((item, index) => {
                    return (
                      <Link
                        className={`${
                          !searchBoxValue ||
                          item["name"].toLowerCase().includes(searchBoxValue)
                            ? "list-group-item sub-route-list-item"
                            : "d-none"
                        } `}
                        to={`/plugs/${item.id}`}
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

              {/* scroller injection */}
              <Scroller
                parentContainerSelector={".sub-route-list.list-group"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OwnedPlugins;
