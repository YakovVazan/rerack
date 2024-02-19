import { useContext } from "react";
import Context from "../../context/Context";
import LoginButton from "./Login/LoginButton/LoginButton";
import AdminButton from "./Admin/AdminButton/AdminButton";
import LogoutButton from "./Logout/LogoutButton/LogoutButton";
import AccountButton from "./Account/AccountButton/AccountButton";
import RegisterButton from "./Register/RegisterButton/RegisterButton";
import { localStorageIsOwner } from "../../config/localStorage.js";
import "./Auth.css";

const Auth = () => {
  const contextData = useContext(Context);

  return (
    <>
      {!contextData["token"] ? (
        <span id="sign-up-and-in-buttons">
          <RegisterButton />
          <LoginButton />
        </span>
      ) : (
        <span id="logout-and-account-buttons">
          {localStorageIsOwner === "true" && <AdminButton />}
          <AccountButton />
          <LogoutButton />
        </span>
      )}
    </>
  );
};

export default Auth;
