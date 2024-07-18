import { useContext } from "react";
import Context from "../../../context/Context";
import SvgSun from "../../../components/svg/SvgSun/SvgSun";
import SvgMoon from "../../../components/svg/SvgMoon/SvgMoon";
import "./Preferences.css";

const Preferences = () => {
  const { isDarkMode, setIsDarkMode } = useContext(Context);

  return (
    <div className="sub-route-wrapper">
      <div id="view-account">
        <span className="header-section">
          <h4 className="header-name">Theme</h4>
          <hr className="header-line" />
        </span>
        <div className="theme-toggler">
          <div className="btn-group">
            <button
              className={`btn customed-button ${isDarkMode && "active"} theme-button`}
              onClick={() => setIsDarkMode(true)}
            >
              <SvgMoon />
              <span>Dark</span>
            </button>
            <button
              className={`btn customed-button ${!isDarkMode && "active"} theme-button`}
              onClick={() => setIsDarkMode(false)}
            >
              <SvgSun />
              <span>Light</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
