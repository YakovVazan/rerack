import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../../../context/Context";
import useUsers from "../../../hooks/useUsers";
import { consts } from "../../../config/constants";
import SvgEye from "../../../components/svg/SvgEye/SvgEye";
import SvgBan from "../../../components/svg/SvgBan/SvgBan";
import Spinner from "../../../components/Common/Spinner/Spinner";
import Scroller from "../../../components/Common/Scroller/Scroller";
import SvgPersonAdd from "../../../components/svg/SvgPersonAdd/SvgPersonAdd";
import SvgPersonRemove from "../../../components/svg/SvgPersonRemove/SvgPersonRemove";
import ColoredDivider from "../../../components/Common/ColoredDivider/ColoredDivider";
import {
  localStorageIsAdmin,
  localStorageIsOwner,
} from "../../../config/localStorage";
import "./Users.css";

const Users = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const { users, isLoading } = useUsers();
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const {
    setDeletionModalContents,
    setAdminsModalContents,
    token,
    usersState,
    setUsersState,
  } = useContext(Context);

  useEffect(() => {
    if (localStorageIsAdmin !== "true") navigate("/");
  });

  const handleAdmins = (userName, email, userId, isAdmin) => {
    setAdminsModalContents({
      userName: userName,
      email: email,
      userId: userId,
      isAdmin: isAdmin,
    });
  };

  const handleBanning = async (username, userId) => {
    setDeletionModalContents({
      url: `${consts.baseURL}/users/${userId}/delete`,
      msg: `${username}'s account`,
      id: `${userId}`,
    });
  };

  // update total value
  useEffect(() => {
    setTotal(
      users.filter((f) => f["name"].toLowerCase().includes(searchBoxValue))
        .length
    );
  }, [searchBoxValue, users]);

  // update users' state to keep UI up to date
  useEffect(() => {
    setUsersState(users);
  }, [users]);

  return (
    <>
      {isLoading ? (
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
                className="table table-bordered"
              >
                <thead>
                  <tr className="users-tr">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersState.map((user) => (
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
                            className="btn btn-outline-primary watch-user"
                            title="Watch"
                          >
                            <SvgEye />
                          </Link>
                          <span
                            className={`${
                              localStorageIsOwner === "false" && "d-none"
                            } btn btn-outline-success`}
                            title={`${user.isAdmin ? "remove" : "add"} admin`}
                            data-bs-dismiss="offcanvas"
                            data-bs-toggle={token && "modal"}
                            data-bs-target={token && "#adminsModal"}
                            onClick={() =>
                              handleAdmins(
                                user.name,
                                user.email,
                                user.id,
                                user.isAdmin
                              )
                            }
                          >
                            {!user.isAdmin ? (
                              <SvgPersonAdd />
                            ) : (
                              <SvgPersonRemove />
                            )}
                          </span>
                          <span
                            className="btn btn-outline-danger"
                            title="BAN"
                            data-bs-dismiss="offcanvas"
                            data-bs-toggle={token && "modal"}
                            data-bs-target={token && "#deletingModal"}
                            onClick={() => handleBanning(user.name, user.id)}
                          >
                            <SvgBan />
                          </span>
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
