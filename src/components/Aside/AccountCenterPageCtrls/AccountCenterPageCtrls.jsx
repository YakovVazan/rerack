import { Fragment, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SvgTag from "../../svg/SvgTag/SvgTag";
import Context from "../../../context/Context";
import SvgHeart from "../../svg/SvgHeart/SvgHeart";
import SvgAdmin from "../../svg/SvgAdmin/SvgAdmin";
import SvgPencil from "../../svg/SvgPencil/SvgPencil";
import SvgAccount from "../../svg/SvgAccount/SvgAccount";
import SvgPreferences from "../../svg/SvgPreferences/SvgPreferences";
import ColoredDivider from "../../Common/ColoredDivider/ColoredDivider";
import {
  localStorageIsAdmin,
  setLocalStorageAccountPageSubRouteIndex,
} from "../../../config/localStorage";
import "./AccountCenterPageCtrls.css";

const AccountCenterPageCtrls = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const contextData = useContext(Context);

  const list = [
    { title: "Account", svg: <SvgAccount /> },
    { title: "Preferences", svg: <SvgPreferences /> },
    { title: "Contributions", svg: <SvgPencil /> },
    { title: "Owned Plugins", svg: <SvgTag /> },
    { title: "Wishlist", svg: <SvgHeart /> },
    { title: "Dashboard", svg: <SvgAdmin /> },
  ];

  function updateSubRoute(index) {
    setLocalStorageAccountPageSubRouteIndex(index);
    navigate(
      index === list.length - 1
        ? "/users"
        : `/users/${location.pathname.split("/")[2]}${
            index > 0
              ? "/" + list[index].title.trim().toLowerCase().replace(/ /g, "_")
              : ""
          }`
    );
    contextData["setAccoutPageSubRoute"](index);
  }

  return (
    <>
      <ul className="list-group account-center-aside-list">
        {list.map((item, index) => {
          return (
            <Fragment key={index}>
              <li
                className={`list-group-item aside-controls ${
                  contextData["accountPageSubRoute"] === index && "active"
                } ${index === list.length - 1 && "d-none"}`}
                onClick={() => updateSubRoute(index)}
                data-bs-dismiss="offcanvas"
              >
                {item.svg} {item.title}
              </li>
              {index === 1 && <ColoredDivider margin={"0"} />}
            </Fragment>
          );
        })}
      </ul>
      {localStorageIsAdmin === "true" && (
        <span
          className={`admin-button list-group-item aside-controls ${
            contextData["accountPageSubRoute"] === list.length - 1 && "active"
          }`}
          onClick={() => updateSubRoute(list.length - 1)}
          data-bs-dismiss="offcanvas"
        >
          {list[list.length - 1].svg} {list[list.length - 1].title}
        </span>
      )}
    </>
  );
};

export default AccountCenterPageCtrls;
