import { Link } from "react-router-dom";

const InfoMenu = () => {
  return (
    <ul className="dropdown-menu">
      <li>
        <Link to={"privacy_policy"} className="dropdown-item">
          Privacy Policy
        </Link>
      </li>
    </ul>
  );
};

export default InfoMenu;
