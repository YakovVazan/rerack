import Context from "../../context/Context";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  localStorageLogout,
  localStorageToken,
} from "../../config/localStorage";
import Spinner from "../../components/Common/Spinner/Spinner";
import "./AccountPage.css";

const AccountPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const contextData = useContext(Context);
  const [userDetails, setUserDetails] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const res = await fetch(`https://api-rerack.onrender.com/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorageToken}`,
          },
        });

        if (!res.ok) {
          const errorResponse = await res.json();

          console.log(errorResponse.msg || errorResponse.error);
          localStorageLogout();
          contextData.setToken("");
          navigate("/users/login");
        }

        const data = await res.json();
        setUserDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingUser(false);
      }
    }

    fetchUserDetails();
  }, [id]);

  console.log(userDetails);

  return (
    <>
      {loadingUser ? (
        <Spinner />
      ) : (
        <div id="personal-card" className="card">
          <div className="card-header">
            <h3>
              <strong>Personal info</strong>
            </h3>
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{userDetails.name}</td>
                  <td>{userDetails.email}</td>
                </tr>
              </tbody>
            </table>

            <div id="personal-buttons" className="btn-group" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-outline-warning">
                Edit
              </button>
              <button type="button" className="btn btn-outline-info">
                History
              </button>
              <button type="button" className="btn btn-outline-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountPage;
