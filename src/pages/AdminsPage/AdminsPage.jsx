import { useContext, useEffect, useState } from "react";
import { consts } from "../../config/constants";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Common/Spinner/Spinner";
import {
  localStorageIsOwner,
  localStorageLogout,
  localStorageToken,
} from "../../config/localStorage";
import "./AdminsPage.css";
import DownloadButton from "../../components/Download/DownloadButton";
import Context from "../../context/Context";
import SvgEye from "../../components/svg/SvgEye/SvgEye";
import SvgBan from "../../components/svg/SvgBan/SvgBan";

const AdminsPage = () => {
  const navigate = useNavigate();
  const contextData = useContext(Context);
  const [allUsersData, setAllUsersData] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    if (localStorageIsOwner !== "true") navigate("/");
  });

  async function handleBanning(userId) {
    try {
      const res = await fetch(`${consts.baseURL}/users/${userId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
        body: JSON.stringify(userId),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.msg || errorResponse.error);
      }
    } catch (error) {
      console.error(error);
    }
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
        <>
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
                <tr className="users-tr" key={user.id}>
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
                        onClick={() => handleBanning(user.id)}
                      >
                        <SvgBan />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <DownloadButton />
        </>
      )}
    </>
  );
};

export default AdminsPage;
