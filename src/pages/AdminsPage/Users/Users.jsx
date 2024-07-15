import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../../../context/Context";
import { consts } from "../../../config/constants";
import SvgEye from "../../../components/svg/SvgEye/SvgEye";
import SvgBan from "../../../components/svg/SvgBan/SvgBan";
import Spinner from "../../../components/Common/Spinner/Spinner";
import Scroller from "../../../components/Common/Scroller/Scroller";
import ColoredDivider from "../../../components/Common/ColoredDivider/ColoredDivider";
import {
  localStorageIsOwner,
  localStorageToken,
} from "../../../config/localStorage";
import "./Users.css";

const Users = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [allUsersData, setAllUsersData] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const { setDeletionModalContents, token } = useContext(Context);

  useEffect(() => {
    if (localStorageIsOwner !== "true") navigate("/");
  });

  async function handleBanning(username, userId) {
    setDeletionModalContents({
      url: `${consts.baseURL}/users/${userId}/delete`,
      msg: `${username}'s account`,
      id: `${userId}`,
    });
  }

  async function fetchAllUsers() {
    try {
      const res = await fetch(`${consts.baseURL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.msg || errorResponse.error);
      } else {
        const data = await res.json();
        setAllUsersData(data);
      }
    } catch (error) {
      navigate("/");
    } finally {
      setLoadingUsers(false);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // update total value
  useEffect(() => {
    setTotal(
      allUsersData.filter((f) =>
        f["name"].toLowerCase().includes(searchBoxValue)
      ).length
    );
  }, [searchBoxValue, allUsersData]);

  return (
    <>
      {loadingUsers ? (
        <Spinner />
      ) : (
        <div className="table-wrapper">
          <div className="sub-route-list-wrapper">
            <div className="total-and-filter">
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

            <span id="table-container">
              <table
                id="admins-table"
                className="table table-striped table-bordered"
              >
                <thead>
                  <tr className="users-tr">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsersData.map((user) => (
                    <tr
                      className={`${
                        !searchBoxValue ||
                        user["name"].toLowerCase().includes(searchBoxValue)
                          ? "users-tr"
                          : "d-none"
                      } `}
                      id={user.id}
                      key={user.id}
                    >
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <div className="btn-group">
                          <Link
                            to={`/users/${user.id}`}
                            className="btn btn-outline-primary"
                            title="Watch"
                          >
                            <SvgEye />
                          </Link>
                          <Link
                            to={``}
                            className="btn btn-outline-danger"
                            title="BAN"
                            data-bs-dismiss="offcanvas"
                            data-bs-toggle={token && "modal"}
                            data-bs-target={token && "#deletingModal"}
                            onClick={() => handleBanning(user.name, user.id)}
                          >
                            <SvgBan />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* scroller injection */}
              <Scroller parentContainerSelector={"#table-container"} />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
