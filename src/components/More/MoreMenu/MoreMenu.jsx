import { Link } from "react-router-dom";
import SvgInfo from "../../svg/SvgInfo/SvgInfo";
import SvgPrivacy from "../../svg/SvgPrivacy/SvgPrivacy";
import ColoredDivider from "../../Common/ColoredDivider/ColoredDivider";

const MoreMenu = () => {
  return (
    <ul className="dropdown-menu customed-dropdown">
      <li data-bs-dismiss="offcanvas">
        <Link
          to={"about"}
          className="dropdown-item customed-dropdown-item customed-button-with-icon "
        >
          <SvgInfo />
          About
        </Link>
      </li>
      <ColoredDivider margin={".5rem"}/>
      <li data-bs-dismiss="offcanvas">
        <Link
          to={"privacy_policy"}
          className="dropdown-item customed-dropdown-item customed-button-with-icon "
        >
          <SvgPrivacy />
          Privacy Policy
        </Link>
      </li>
    </ul>
  );
};

export default MoreMenu;
