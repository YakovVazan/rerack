import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../../context/Context";
import SvgInbox from "../../svg/SvgInbox/SvgInbox";
import SvgPeople from "../../svg/SvgPeople/SvgPeople";
import SvgPencil from "../../svg/SvgPencil/SvgPencil";
import SvgDownload from "../../svg/SvgDownload/SvgDownload";
import { setLocalStorageAdminPageSubRouteIndex } from "../../../config/localStorage";
import useNavigation from "../../../hooks/useNavigation";

const AdminPageCtrls = () => {
  const navigate = useNavigate();
  const { urlToArray } = useNavigation();
  const contextData = useContext(Context);

  const list = [
    { title: " Users", svg: <SvgPeople /> },
    { title: " Inbox", svg: <SvgInbox /> },
    { title: " Activity", svg: <SvgPencil /> },
    { title: " Download", svg: <SvgDownload /> },
  ];

  const updateSubRoute = (index) => {
    navigate(
      index === 0
        ? "/users/dashboard"
        : `/users/dashboard/${list[index].title.trim().toLowerCase()}`
    );
    updateUi(index);
  };

  const updateUi = (index) => {
    setLocalStorageAdminPageSubRouteIndex(index);
    contextData["setAdminPageSubRoute"](index);
  };

  useEffect(() => {
    if (urlToArray(location.pathname).includes("inbox")) updateUi(1);
  }, []);

  return (
    <>
      <ul className="list-group account-center-aside-list">
        {list.map((item, index) => {
          return (
            <li
              className={`btn customed-button customed-button-with-icon ${
                contextData["adminPageSubRoute"] === index && "active"
              }`}
              key={index}
              onClick={() => updateSubRoute(index)}
              data-bs-dismiss="offcanvas"
            >
              {item.svg} {item.title}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AdminPageCtrls;
