import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Context from "../../../context/Context";
import useToasts from "../../../hooks/useToasts";
import { consts } from "../../../config/constants";
import SvgInfo from "../../../components/svg/SvgInfo/SvgInfo";
import Spinner from "../../../components/Common/Spinner/Spinner";
import SvgPencil from "../../../components/svg/SvgPencil/SvgPencil";
import Scroller from "../../../components/Common/Scroller/Scroller";
import ColoredDivider from "../../../components/Common/ColoredDivider/ColoredDivider";
import {
  localStorageId,
  localStorageToken,
} from "../../../config/localStorage";
import "../SubRoutes.css";

const Contributions = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const location = useLocation();
  const [total, setTotal] = useState(0);
  const [formattedData, setFormattedData] = useState([]);
  const { token, setContributions } = useContext(Context);
  const [searchBoxValue, setSearchBoxValue] = useState("");
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
        localStorageId
          ? navigate(`/users/${localStorageId}/contributions`)
          : navigate(`/users/login`);
      } else {
        const data = await res.json();
        setContributedData(data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoaddingContributions(false);
    }
  };

  const handleContributionsModal = (item) => {
    setContributions(
      contributedData.filter((x) => {
        return x.plugId === item.plugId;
      })
    );
  };

  // remove duplicates from contributedData array
  useEffect(() => {
    setFormattedData(
      contributedData.reduce((acc, item) => {
        if (!acc.some((existingItem) => existingItem.plugId === item.plugId)) {
          acc.push(item);
        }
        return acc;
      }, [])
    );

    setTotal(formattedData.length);
  }, [contributedData]);

  useEffect(() => {
    fetchUserDistributions();
  }, []);

  // update total value
  useEffect(() => {
    setTotal(
      formattedData.filter((f) =>
        f["plugName"].toLowerCase().includes(searchBoxValue)
      ).length
    );
  }, [searchBoxValue]);

  return (
    <>
      {loadingContributions ? (
        <Spinner />
      ) : (
        <div className="sub-route-wrapper">
          <div className="contributions-wrapper">
            {/* Empty list */}
            <div
              className={`${
                contributedData.length > 0 && "d-none"
              } empty-sub-route-list-wrapper`}
            >
              <div className="empty-sub-route-list">
                <SvgPencil />
                <span>
                  Plugs you contributed to (by adding or editing) will appear
                  here
                </span>
              </div>
            </div>

            {/* Not empty list */}
            <div
              className={`${
                contributedData.length <= 0 && "d-none"
              } sub-route-list-wrapper`}
            >
              <div className="total-and-filter">
                {/* total */}
                <h2 className="total-header">
                  <strong>Total: {total}</strong>
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

              <ul
                className={`${
                  formattedData.length <= 0 && "d-none"
                } sub-route-list list-group`}
              >
                {formattedData.map((item, index) => {
                  return (
                    <span
                      className={`${
                        !searchBoxValue ||
                        item["plugName"].toLowerCase().includes(searchBoxValue)
                          ? "list-group-item sub-route-list-item"
                          : "d-none"
                      } `}
                      key={index}
                    >
                      <Link
                        className="undecorated-link"
                        to={`/plugs/${item.plugId}`}
                      >
                        <span>{item.plugName}</span>
                      </Link>
                      <span
                        data-bs-toggle={token && "modal"}
                        data-bs-target={token && "#contributionsModal"}
                        data-bs-dismiss="offcanvas"
                        className="btn"
                        onClick={() => handleContributionsModal(item)}
                      >
                        <SvgInfo />
                      </span>
                    </span>
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

export default Contributions;
