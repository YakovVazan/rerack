import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Context from "../../../context/Context";
import useToasts from "../../../hooks/useToasts";
import { consts } from "../../../config/constants";
import useHistory from "../../../hooks/useHistory";
import Spinner from "../../../components/Common/Spinner/Spinner";
import { editUser, getUser, verifyUser } from "../../../services/users";
import {
  localStorageId,
  localStorageLogin,
  setLocalStorageToken,
} from "../../../config/localStorage";
import "./Personal.css";

const Personal = () => {
  const { id } = useParams();
  const showToast = useToasts();
  const navigate = useNavigate();
  const { forceGoingBack } = useHistory();
  const contextData = useContext(Context);
  const [userDetails, setUserDetails] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  const [userNewDetails, setUserNewDetails] = useState({});

  useEffect(() => {
    contextData["setDeletionModalContents"]({
      url: `${consts.baseURL}/users/${id}/delete`,
      msg: "Your account",
    });
  }, []);

  useEffect(() => {
    if (id) fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      const res = await getUser(id);

      if (!res.ok) {
        if (res.status === 404) {
          showToast(res.statusText);
          localStorageId
            ? navigate(`/users/${localStorageId}`)
            : navigate(`/users/auth/login`);
          setUserNewDetails({
            name: userDetails.name,
            email: userDetails.email,
            password: "",
          });
          forceGoingBack();
        } else {
          const errorResponse = await res.json();
          throw new Error(errorResponse.msg || errorResponse.error);
        }
      } else {
        const data = await res.json();
        setUserDetails(data);
        setUserNewDetails({
          name: data.name,
          email: data.email,
          password: "",
        });
      }
    } catch (error) {
      navigate("/");
      showToast(error.message || error.msg);
    } finally {
      setLoadingUser(false);
    }
  };

  const handleChange = (key, value) => {
    setUserNewDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  async function handleEdition() {
    try {
      const payload = {
        id: id,
        name: userNewDetails.name,
        email: userNewDetails.email,
        password: userNewDetails.password,
      };

      const res = await editUser(id, payload);

      if (!res.ok) {
        const errorResponse = await res.json();
        showToast(errorResponse.msg || errorResponse.error);
      } else {
        const response = JSON.parse(await res.text());
        setUserNewDetails({
          name: userNewDetails.name || userDetails.name,
          email: userNewDetails.email || userDetails.email,
          password: "",
        });
        setUserDetails({
          ...userDetails,
          isVerified: response.isVerified,
          name: userNewDetails.name || userDetails.name,
          email: userNewDetails.email || userDetails.email,
        });
        document.getElementById("name-input").value =
          userNewDetails.name || userDetails.name;
        document.getElementById("email-input").value =
          userNewDetails.email || userDetails.email;
        document.getElementById("password-input").value = "";
        showToast("Details updated successfully");
        localStorageLogin(
          response.token,
          response.id,
          response.isAdmin,
          response.isOwner,
          response.isVerified
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUser(false);
    }
  }

  async function handleVerification() {
    try {
      const res = await verifyUser(userDetails.id);

      if (!res.ok) {
        const errorResponse = await res.json();
        showToast(errorResponse.msg || errorResponse.error);
        console.log(errorResponse.msg || errorResponse.error);
      } else {
        const response = JSON.parse(await res.text());
        setLocalStorageToken(response);
        showToast("A code was sent to your email address");
      }
    } catch (error) {
      console.error(error);
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
                <ul>
                  <li>{userDetails.name}</li>
                  <li>{userDetails.email}</li>
                </ul>
                <div className="edit-button-container">
                  <button
                    type="button"
                    className={`edit-button btn btn-outline-success ${
                      +userDetails.isVerified === 1 && "d-none"
                    }`}
                    onClick={handleVerification}
                  >
                    Verify
                  </button>
                </div>
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
                    id="name-input"
                    type="text"
                    className="edit-input form-control"
                    placeholder="new name"
                    defaultValue={userDetails.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  ></input>
                  <input
                    id="email-input"
                    type="email"
                    className="edit-input form-control"
                    placeholder="new email"
                    defaultValue={userDetails.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  ></input>
                  <input
                    id="password-input"
                    type="password"
                    className="edit-input form-control"
                    placeholder="new password"
                    defaultValue={userNewDetails.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                  ></input>
                </div>
                <div className="edit-button-container">
                  <button
                    type="button"
                    className={`edit-button btn btn-outline-primary ${
                      (userNewDetails.password === "" ||
                        userNewDetails.password.length < 6) &&
                      (userNewDetails.name === "" ||
                        userDetails.name === userNewDetails.name) &&
                      (userNewDetails.email === "" ||
                        userDetails.email === userNewDetails.email) &&
                      "disabled"
                    }`}
                    onClick={handleEdition}
                  >
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
                <span>Permanent account deletion, cannot be undone.</span>
                <div className="edit-button-container">
                  <button
                    id="delete-account-button"
                    className="btn btn-outline-danger"
                    data-bs-dismiss="offcanvas"
                    data-bs-toggle={contextData["token"] && "modal"}
                    data-bs-target={contextData["token"] && "#deletingModal"}
                  >
                    Delete
                  </button>
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Personal;
