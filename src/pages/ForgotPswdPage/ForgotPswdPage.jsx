import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useIf from "../../hooks/useIf";
import useToasts from "../../hooks/useToasts";
import { consts } from "../../config/constants";
import useHistory from "../../hooks/useHistory";
import "../../styles/auth-card.css";
import "../../styles/buttons.css";

const ForgotPswdPage = () => {
  const ReactIf = useIf();
  const showToast = useToasts();
  const navigate = useNavigate();
  const [hash, setHash] = useState("");
  const { forceGoingBack } = useHistory();
  const [givenEmail, setGivenEmail] = useState("");
  const [alreadySent, setAlreadySent] = useState(false);
  const [givenPassword, setGivenPassword] = useState("");

  const handleEmailChange = (event) => {
    setGivenEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setGivenPassword(event.target.value);
  };

  const getNewPassword = async () => {
    const res = await fetch(`${consts.baseURL}/users/get_new_password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: givenEmail }),
    });

    let response;
    let text = await res.text();

    try {
      response = JSON.parse(text);
    } catch (error) {
      response = text;
    }

    if (!res.ok) {
      showToast(response?.msg || response.error || response);
    } else {
      showToast("A new password has been sent to your email successfully.");
      setAlreadySent(true);
      setHash(response["hash"]);
    }
  };

  const postNewPassword = async () => {
    const res = await fetch(`${consts.baseURL}/users/reset_password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: givenEmail,
        password: givenPassword,
        hash: hash,
      }),
    });

    let response;
    let text = await res.text();

    try {
      response = JSON.parse(text);
    } catch (error) {
      response = text;
    }

    if (!res.ok) {
      showToast(response?.msg || response?.error || response);
      setGivenPassword("");
    } else {
      showToast(
        "Your password was updated successfully. Please use it to login."
      );
      forceGoingBack();
      navigate("/users/login");
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (alreadySent) {
      postNewPassword();
    } else {
      getNewPassword();
    }
  }

  return (
    <div className="authentication-form">
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="card auth-card">
          <div className="card-header">
            <h3>
              <strong>Reset Password</strong>
            </h3>
          </div>
          <div className="card-body">
            <ReactIf condition={!alreadySent}>
              <div id="forgot-password-announcement">
                We need you to enter the email address with which you initially
                created your Rerack account so that we can provide you with an
                alternative new password.
              </div>
              <div className="form-floating">
                <input
                  type="email"
                  name="email"
                  id="floatingEmail"
                  className="form-control"
                  placeholder="Email"
                  defaultValue={givenEmail}
                  onChange={handleEmailChange}
                  autoFocus
                />
                <label htmlFor="floatingEmail">Email</label>
              </div>
            </ReactIf>

            <ReactIf condition={alreadySent}>
              <div id="forgot-password-announcement">
                A new password has been sent to the email you provided. Please
                type it below.
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  name="password"
                  id="floatingPassword"
                  className="form-control"
                  placeholder="Password"
                  defaultValue={givenPassword}
                  onChange={handlePasswordChange}
                  autoFocus
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
            </ReactIf>
            <div id="forgot-password-buttons">
              <ReactIf condition={!alreadySent}>
                <input
                  type="submit"
                  value="Get code"
                  className="btn customed-button"
                  disabled={!givenEmail}
                />
              </ReactIf>

              <ReactIf condition={alreadySent}>
                <input
                  type="submit"
                  value="Submit"
                  className="btn customed-button"
                  disabled={!givenPassword}
                />
              </ReactIf>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPswdPage;
