import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../../context/Context";
import SvgPeople from "../../svg/SvgPeople/SvgPeople";
import SvgPencil from "../../svg/SvgPencil/SvgPencil";
import SvgDownload from "../../svg/SvgDownload/SvgDownload";
import { setLocalStorageAdminPageSubRouteIndex } from "../../../config/localStorage";

const AdminPageCtrls = () => {
  const navigate = useNavigate();
  const contextData = useContext(Context);

  const list = [
    { title: " Users", svg: <SvgPeople /> },
    { title: " Activity", svg: <SvgPencil /> },
    { title: " Download", svg: <SvgDownload /> },
  ];

  const updateSubRoute = (index) => {
    setLocalStorageAdminPageSubRouteIndex(index);
    navigate(
      index === 0
        ? "/users"
        : `/users/${list[index].title.trim().toLowerCase()}`
    );
    contextData["setAdminPageSubRoute"](index);
  };

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
