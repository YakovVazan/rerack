import { Fragment, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SvgTag from "../../svg/SvgTag/SvgTag";
import Context from "../../../context/Context";
import SvgMore from "../../svg/SvgMore/SvgMore";
import SvgFlag from "../../svg/SvgFlag/SvgFlag";
import SvgHeart from "../../svg/SvgHeart/SvgHeart";
import SvgAdmin from "../../svg/SvgAdmin/SvgAdmin";
import MoreMenu from "../../More/MoreMenu/MoreMenu";
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
    { title: "Reports", svg: <SvgFlag /> },
    { title: "Contributions", svg: <SvgPencil /> },
    { title: "Owned Plugins", svg: <SvgTag /> },
    { title: "Wishlist", svg: <SvgHeart /> },
    { title: "Dashboard", svg: <SvgAdmin /> },
    { title: "More", svg: <SvgMore /> },
  ];

  function updateSubRoute(index) {
    navigate(
      index === list.length - 2
        ? "/users/dashboard"
        : `/users/${location.pathname.split("/")[2]}${
            index > 0
              ? "/" + list[index].title.trim().toLowerCase().replace(/ /g, "_")
              : ""
          }`
    );

    if (list[index].title !== "Dashboard") {
      setLocalStorageAccountPageSubRouteIndex(index);
      contextData["setAccoutPageSubRoute"](index);
    }
  }

  return (
    <>
      <span id="account-center-aside-list-wrapper">
        <ul className="list-group account-center-aside-list">
          {list.map((item, index) => {
            return (
              <Fragment key={index}>
                <li
                  className={`btn customed-button customed-button-with-icon ${
                    contextData["accountPageSubRoute"] === index && "active"
                  } ${
                    ((item.title === "Dashboard" &&
                      localStorageIsAdmin == "false") ||
                      index === list.length - 1) &&
                    "d-none"
                  }`}
                  onClick={() => updateSubRoute(index)}
                  data-bs-dismiss="offcanvas"
                >
                  {item.svg} {item.title}
                </li>
                {(index == 2 ||
                  (index == 5 && localStorageIsAdmin == "true")) && (
                  <ColoredDivider margin={"0"} />
                )}
              </Fragment>
            );
          })}
        </ul>
        <span className="dropup">
          <ColoredDivider />
          <span
            className={`btn dropdown-toggle customed-button customed-button-with-icon more-toggle ${
              contextData["accountPageSubRoute"] === list.length - 1 && "active"
            }`}
            data-bs-toggle="dropdown"
            title="more"
          >
            <span>
              {list[list.length - 1].svg} {list[list.length - 1].title}
            </span>
          </span>
          <MoreMenu />
        </span>
      </span>
    </>
  );
};

export default AccountCenterPageCtrls;
