import { useContext } from "react";
import Context from "../../context/Context";
import LoginButton from "./Login/LoginButton/LoginButton";
import LogoutButton from "./Logout/LogoutButton/LogoutButton";
import AccountButton from "./Account/AccountButton/AccountButton";
import RegisterButton from "./Register/RegisterButton/RegisterButton";
import "./Auth.css";

const Auth = () => {
  const contextData = useContext(Context);
  console.log(contextData["token"]);

  return (
    <>
      {!contextData["token"] ? (
        <span id="sign-up-and-in-buttons">
          <RegisterButton />
          <LoginButton />
        </span>
      ) : (
        <span id="logout-and-account-buttons">
          <AccountButton />
          <LogoutButton />
        </span>
      )}
    </>
  );
};

export default Auth;
