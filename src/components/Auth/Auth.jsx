import LoginButton from "./Login/LoginButton/LoginButton";
import RegisterButton from "./Register/RegisterButton/RegisterButton";
import "./Auth.css";

const Auth = () => {
  return (
    <>
      <span id="sign-up-and-in-buttons">
        <LoginButton />
        <RegisterButton />
      </span>
    </>
  );
};

export default Auth;
