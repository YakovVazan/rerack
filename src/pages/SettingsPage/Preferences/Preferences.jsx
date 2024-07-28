import { useContext } from "react";
import Context from "../../../context/Context";
import SvgSun from "../../../components/svg/SvgSun/SvgSun";
import SvgMoon from "../../../components/svg/SvgMoon/SvgMoon";
import SvgComputer from "../../../components/svg/SvgComputer/SvgComputer";
import "./Preferences.css";

const Preferences = () => {
  const { theme, setTheme } = useContext(Context);
  const themes = [
    { name: "Light", svg: <SvgSun /> },
    { name: "Dark", svg: <SvgMoon /> },
    { name: "Machine", svg: <SvgComputer /> },
  ];

  return (
    <div className="sub-route-wrapper">
      <div id="theme-section">
        <span className="header-section">
          <h4 className="header-name">Theme</h4>
          <hr className="header-line" />
        </span>
        <div className="preference-section">
          <small className="theme-text">
            Choose your prefered theme; light, dark or automatically set as your
            machine&lsquo;s
          </small>
          <div
            className="btn customed-button dropdown-toggle theme-toggle"
            data-bs-toggle="dropdown"
            title="filter"
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </div>

          {/* theme drop down */}
          <ul className="dropdown-menu customed-dropdown">
            {themes.map((item, index) => {
              return (
                <li
                  key={index}
                  className="dropdown-item customed-dropdown-item"
                  onClick={() => setTheme(item.name.toLowerCase())}
                >
                  {item.name} {item.svg}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
