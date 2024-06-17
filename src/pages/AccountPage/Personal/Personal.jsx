import Context from "../../../context/Context";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Common/Spinner/Spinner";
import { consts } from "../../../config/constants";
import {
  localStorageId,
  localStorageLogout,
  localStorageToken,
} from "../../../config/localStorage";
import "./Personal.css";

const Personal = () => {
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
            handleToast(res.statusText);
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
        <div className="sub-route-wrapper">
          <div className="account-sections">
            <div id="view-account">
              <span className="header-section">
                <h4 className="header-name">Account</h4>
                <hr className="header-line" />
              </span>
              <span className="content-section">
                <li>{userDetails.name}</li>
                <li>{userDetails.email}</li>
              </span>
            </div>
            <div id="edit-account">
              <span className="header-section">
                <h4 className="header-name">Edit</h4>
                <hr className="header-line" />
              </span>
              <span className="content-section">
                <div className="edit-fields">
                  <input
                    type="text"
                    className="edit-input form-control"
                    placeholder="new name"
                    defaultValue={userDetails.name}
                  ></input>
                  <input
                    type="email"
                    className="edit-input form-control"
                    placeholder="new email"
                    defaultValue={userDetails.email}
                  ></input>
                  <input
                    type="password"
                    className="edit-input form-control"
                    placeholder="new password"
                  ></input>
                </div>
                <div className="btn-group edit-buttons" role="group">
                  <button type="button" className="edit-button btn btn-outline-success">
                    Verify
                  </button>
                  <button type="button" className="edit-button btn btn-outline-primary">
                    Save
                  </button>
                </div>
              </span>
            </div>
            <div id="delete-account">
              <span className="header-section">
                <h4 className="header-name">Danger</h4>
                <hr className="header-line" />
              </span>
              <span className="content-section">
                <span>Permanent Deletion, cannot be undone.</span>
                <button
                  id="delete-account-button"
                  className="btn btn-outline-danger"
                  onClick={() => handleDeletion(userDetails.id)}
                >
                  Delete Account
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Personal;
