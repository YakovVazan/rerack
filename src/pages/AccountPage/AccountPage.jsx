import Context from "../../context/Context";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  localStorageLogout,
  localStorageToken,
  localStorageId,
} from "../../config/localStorage";
import { consts } from "../../config/constants";
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
        const res = await fetch(`${consts.baseURL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorageToken}`,
          },
        });

        if (!res.ok) {
          if (res.status === 404) {
            handleToast("User not found");
            navigate(`/users/${localStorageId}`);
          } else {
            const errorResponse = await res.json();
            throw new Error(errorResponse.msg || errorResponse.error);
          }
        } else {
          const data = await res.json();
          setUserDetails(data);
        }
      } catch (error) {
        console.error(error);
        localStorageLogout();
        contextData.setToken("");
        navigate("/users/login");
      } finally {
        setLoadingUser(false);
      }
    }

    fetchUserDetails();
  }, [id]);

  function handleToast(msg) {
    contextData["setToastVisibility"](true);
    contextData["setToastMessage"](msg);
  }

  async function handleDeletion(id) {
    try {
      const res = await fetch(`${consts.baseURL}/users/${id}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
        body: JSON.stringify(id),
      });

      if (!res.ok) {
        const errorResponse = await res.json();

        console.log(errorResponse.msg || errorResponse.error);
      }

      contextData["setToken"]("");
      contextData["setToastMessage"]("Account deleted successfully");
      contextData["setToastVisibility"](true);
      localStorageLogout();
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUser(false);
    }
  }

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

            <div
              id="personal-buttons"
              className="btn-group"
              role="group"
              aria-label="Basic example"
            >
              <button
                onClick={() =>
                  handleToast(
                    "Here you gonna be able to edit your personal details"
                  )
                }
                type="button"
                className="btn btn-outline-warning"
              >
                Edit
              </button>
              <button
                onClick={() =>
                  handleToast("Your editing history will show here")
                }
                type="button"
                className="btn btn-outline-info"
              >
                History
              </button>
              <button
                onClick={() => handleDeletion(userDetails.id)}
                type="button"
                className="btn btn-outline-danger"
              >
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
