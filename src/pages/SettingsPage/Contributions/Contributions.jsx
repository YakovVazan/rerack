import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../../../context/Context";
import useToasts from "../../../hooks/useToasts";
import { localStorageId } from "../../../config/localStorage";
import Spinner from "../../../components/Common/Spinner/Spinner";
import SvgPencil from "../../../components/svg/SvgPencil/SvgPencil";
import Scroller from "../../../components/Common/Scroller/Scroller";
import { getUserContributions } from "../../../services/contributions";
import SvgInfoSquare from "../../../components/svg/SvgInfoSquare/SvgInfoSquare";
import ColoredDivider from "../../../components/Common/ColoredDivider/ColoredDivider";
import "../SubRoutes.css";

const Contributions = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [formattedData, setFormattedData] = useState([]);
  const { token, setContributions } = useContext(Context);
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [contributedData, setContributedData] = useState([]);
  const [loadingContributions, setLoaddingContributions] = useState(true);

  const fetchUserDistributions = async () => {
    try {
      const res = await getUserContributions();

      if (!res.ok) {
        const errorResponse = await res.json();
        showToast(errorResponse.msg || errorResponse.error);
        localStorageId
          ? navigate(`/users/${localStorageId}/contributions`)
          : navigate(`/users/auth/login`);
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
        f["plugName"].toLowerCase().includes(searchBoxValue.toLowerCase())
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
                        item["plugName"]
                          .toLowerCase()
                          .includes(searchBoxValue.toLowerCase())
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
                      <div
                        data-bs-toggle={token && "modal"}
                        data-bs-target={token && "#contributionsModal"}
                        data-bs-dismiss="offcanvas"
                        className="btn customed-svg-button"
                        onClick={() => handleContributionsModal(item)}
                      >
                        <SvgInfoSquare />
                      </div>
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
