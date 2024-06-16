import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { consts } from "../../../config/constants";
import Spinner from "../../../components/Common/Spinner/Spinner";
import SvgPencil from "../../../components/svg/SvgPencil/SvgPencil";
import {
  localStorageId,
  localStorageToken,
} from "../../../config/localStorage";
import "../SubRoutes.css";

const Contributions = () => {
  const [contributedData, setContributedData] = useState([]);
  const [loadingContributions, setLoaddingContributions] = useState(true);

  async function fetchUserDistributions() {
    try {
      const res = await fetch(
        `${consts.baseURL}/users/${localStorageId}/contributions`,
        {
          headers: {
            Authorization: `Bearer ${localStorageToken}`,
          },
        }
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.msg || errorResponse.error);
      } else {
        const data = await res.json();
        setContributedData(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoaddingContributions(false);
    }
  }

  useEffect(() => {
    fetchUserDistributions();
  }, []);

  return (
    <>
      {loadingContributions ? (
        <Spinner />
      ) : (
        <div className="sub-route-wrapper">
          {/* Empty list */}
          <div
            className={`${
              contributedData.length > 0 && "d-none"
            } empty-sub-route-list-wrapper`}
          >
            <div className="empty-sub-route-list">
              <SvgPencil />
              <span>
                Plugs you contributed to (by adding or editing) will appear here
              </span>
            </div>
          </div>

          {/* Not empty list */}
          <div
            className={`${
              contributedData.length <= 0 && "d-none"
            } sub-route-list-wrapper`}
          >
            <ul className="sub-route-list list-group">
              {contributedData.map((item, index) => {
                return (
                  <Link
                    className="list-group-item sub-route-list-item"
                    to={`/plugs/${item.name.replace(/ /g, "_").toLowerCase()}`}
                    key={index}
                  >
                    <span>{item.name}</span>
                    {item.actions.includes("Add") &&
                    item.actions.includes("Edit") ? (
                      <span>Added and Edited</span>
                    ) : item.actions.includes("Add") ? (
                      <span>Added</span>
                    ) : (
                      item.actions.includes("Edit") && <span>Edited</span>
                    )}
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Contributions;
