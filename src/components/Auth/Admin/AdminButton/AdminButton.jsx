import { Link } from "react-router-dom";
import SvgAdmin from "../../../svg/SvgAdmin/SvgAdmin";
import "./AdminButton.css";

const AdminButton = () => {
  return (
    <Link
      className="btn btn-outline-secondary"
      title="admins area"
      to={{ pathname: "/users" }}
    >
      <span id="admin-icon">
        <SvgAdmin />
      </span>
      <span id="admin-word">admins</span>
    </Link>
  );
};

export default AdminButton;
