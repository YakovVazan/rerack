import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { consts } from "../../../config/constants";
import Spinner from "../../../components/Common/Spinner/Spinner";
import SvgPencil from "../../../components/svg/SvgPencil/SvgPencil";
import {
  localStorageId,
  localStorageToken,
} from "../../../config/localStorage";
import useToasts from "../../../hooks/useToasts";
import "../SubRoutes.css";

const Contributions = () => {
  const { id } = useParams();
  const showToast = useToasts();
  const navigate = useNavigate();
  const location = useLocation();
  const [contributedData, setContributedData] = useState([]);
  const [loadingContributions, setLoaddingContributions] = useState(true);

  const fetchUserDistributions = async () => {
    try {
      const res = await fetch(
        `${consts.baseURL}/users/${
          location.pathname.split("/")[2]
        }/contributions`,
        {
          headers: {
            Authorization: `Bearer ${localStorageToken}`,
          },
        }
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        showToast(errorResponse.msg || errorResponse.error);
        console.log(errorResponse);
        localStorageId == id
          ? navigate(`/users/${id}`)
          : navigate(`/users/${localStorageId}`);
      } else {
        const data = await res.json();
        setContributedData(data[0]["contributions"] || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoaddingContributions(false);
    }
  };

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
            <h2 className="total-header">
              <strong>
                Total: {contributedData.length > 0 && contributedData.length}
              </strong>
            </h2>
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
