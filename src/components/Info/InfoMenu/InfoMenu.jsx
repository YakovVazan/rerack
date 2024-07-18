import { Link } from "react-router-dom";
import "../../../styles/dropdowns.css";

const InfoMenu = () => {
  return (
    <ul className="dropdown-menu customed-dropdown">
      <li>
        <Link
          to={"privacy_policy"}
          className="dropdown-item customed-dropdown-item"
        >
          Privacy Policy
        </Link>
      </li>
    </ul>
  );
};

export default InfoMenu;
