import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SvgTag from "../../svg/SvgTag/SvgTag";
import Context from "../../../context/Context";
import SvgHeart from "../../svg/SvgHeart/SvgHeart";
import SvgPencil from "../../svg/SvgPencil/SvgPencil";
import SvgAccount from "../../svg/SvgAccount/SvgAccount";
import { setLocalStorageAccountPageSubRouteIndex } from "../../../config/localStorage";
import "./AccountCenterPageCtrls.css";

const AccountCenterPageCtrls = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const contextData = useContext(Context);

  const list = [
    { title: " Account", svg: <SvgAccount /> },
    { title: " Contributions", svg: <SvgPencil /> },
    { title: " Owned Plugins", svg: <SvgTag /> },
    { title: " Wishlist", svg: <SvgHeart /> },
  ];

  function updateSubRoute(index) {
    setLocalStorageAccountPageSubRouteIndex(index);
    navigate(
      `/users/${location.pathname.split("/")[2]}/${
        index > 0
          ? list[index].title.trim().toLowerCase().replace(" ", "_")
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
            <li
              className={`list-group-item user-ctrls ${
                contextData["accountPageSubRoute"] === index && "active"
              }`}
              key={index}
              onClick={() => updateSubRoute(index)}
              data-bs-dismiss="offcanvas"
            >
              {item.svg}
              {item.title}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AccountCenterPageCtrls;
