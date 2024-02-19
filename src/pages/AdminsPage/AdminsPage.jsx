import { useEffect, useState } from "react";
import { consts } from "../../config/constants";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Common/Spinner/Spinner";
import {
  localStorageIsOwner,
  localStorageToken,
} from "../../config/localStorage";
import "./AdminsPage.css";

const AdminsPage = () => {
  const navigate = useNavigate();
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

        console.log(errorResponse.msg || errorResponse.error);
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
        console.error(errorResponse.msg || errorResponse.error);
        return;
      }

      const data = await res.json();
      setAllUsersData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUsers(false);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, [allUsersData]);

  return (
    <>
      {loadingUsers ? (
        <Spinner />
      ) : (
        <table id="admins-table" className="table table-striped table-bordered">
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-eye"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                      </svg>
                    </Link>
                    <Link
                      to={``}
                      className="btn btn-outline-danger"
                      title="BAN"
                      onClick={() => handleBanning(user.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-ban"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
                      </svg>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AdminsPage;
