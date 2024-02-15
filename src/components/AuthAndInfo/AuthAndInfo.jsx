import Info from "../Info/Info.jsx";
import Auth from "../Auth/Auth.jsx";
import "./AuthAndInfo.css";

const AuthAndInfo = () => {
  return (
    <div id="info-and-account-buttons">
      <Info />
      <Auth />
    </div>
  );
};

export default AuthAndInfo;
