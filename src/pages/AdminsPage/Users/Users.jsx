import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../../../context/Context";
import { consts } from "../../../config/constants";
import SvgEye from "../../../components/svg/SvgEye/SvgEye";
import SvgBan from "../../../components/svg/SvgBan/SvgBan";
import Spinner from "../../../components/Common/Spinner/Spinner";
import {
  localStorageIsOwner,
  localStorageLogout,
  localStorageToken,
} from "../../../config/localStorage";
import "./Users.css";

const Users = () => {
  const navigate = useNavigate();
  const contextData = useContext(Context);
  const [allUsersData, setAllUsersData] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    if (localStorageIsOwner !== "true") navigate("/");
  });

  async function handleBanning(username, userId) {
    contextData["setDeletionModalContents"]({
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
      console.error(error);
      localStorageLogout();
      contextData.setToken("");
      navigate("/users/login");
    } finally {
      setLoadingUsers(false);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <>
      {loadingUsers ? (
        <Spinner />
      ) : (
        <div className="table-wrapper">
          <div className="sub-route-list-wrapper">
            <h2 className="total-header">
              <strong>
                Total: {allUsersData.length > 0 && allUsersData.length}
              </strong>
            </h2>

            <hr />
            
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
                  <tr className="users-tr" id={user.id} key={user.id}>
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
                          data-bs-toggle={contextData["token"] && "modal"}
                          data-bs-target={
                            contextData["token"] && "#deletingModal"
                          }
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
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
