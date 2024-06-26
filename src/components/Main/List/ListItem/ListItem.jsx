import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../../../../context/Context.jsx";
import { consts } from "../../../../config/constants.js";
import SvgArrowRight from "../../../svg/SvgArrowRight/SvgArrowRight.jsx";
import "./ListItem.css";

const ListItem = ({ plug, index }) => {
  const data = useContext(Context);
  const searchBoxValue = data["searchBoxValue"];
  const typeFilterValue = data["typeFilterValue"];
  const companyFilterValue = data["companyFilterValue"];
  const view = data["view"];
  const [selectedItem, setSelectedItem] = useState(-1);

  function handleFocusStart(focuesItem) {
    setSelectedItem(focuesItem);
  }

  function handleFocusEnd() {
    setSelectedItem(-1);
  }

  return (
    <Link
      className="item-link"
      to={{
        pathname: `/plugs/${plug["id"]}`,
      }}
      state={plug}
      key={index}
    >
      <li
        className={`${
          view === "list"
            ? "list-item-plugin list-group-item"
            : "gallery-item-plugin gallery-li card"
        } ${
          (searchBoxValue === "" ||
            plug["name"].toLowerCase().includes(searchBoxValue)) &&
          (typeFilterValue === consts.typeDropDownInitialValue ||
            plug["type"] === typeFilterValue) &&
          (companyFilterValue === consts.companyDropDownInitialValue ||
            plug["company"] === companyFilterValue)
            ? view === "list" && selectedItem === index
              ? "active"
              : ""
            : "d-none"
        }`}
        key={index}
        onMouseDown={() => handleFocusStart(index)}
        onTouchStart={() => handleFocusStart(index)}
        onMouseUp={handleFocusEnd}
        onTouchEnd={handleFocusEnd}
        onDragOver={handleFocusEnd}
      >
        <div
          className={
            view === "list"
              ? "list-img-and-text-container"
              : "gallery-img-and-text-container"
          }
        >
          <div
            className={
              view === "list"
                ? "list-image-container"
                : "gallery-image-container"
            }
          >
            <img
              className={
                view === "list" ? "list-plugin-image" : "gallery-plugin-image"
              }
              src={plug["src"]}
              alt={plug["name"]}
            />
          </div>
          <div
            className={
              view === "list" ? "list-name-and-details-container" : "card-body"
            }
          >
            <span
              className={
                view === "list" ? "list-plugin-name" : "gallery-plugin-name"
              }
            >
              {plug["name"]}
            </span>
            <span
              className={
                view === "gallery"
                  ? "d-none"
                  : "list-company-and-type-container"
              }
            >
              <span className="company-list" title="company">
                {plug["company"]}
              </span>
              <span id="list-company-and-type-dash">{" - "}</span>
              <span className="list-type" title="type">
                {plug["type"]}
              </span>
            </span>
          </div>
        </div>
        <SvgArrowRight view={view} />
      </li>
    </Link>
  );
};

export default ListItem;
