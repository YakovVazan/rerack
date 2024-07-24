import { useContext } from "react";
import Context from "../../../../context/Context.jsx";
import SvgList from "../../../svg/SvgList/SvgList.jsx";
import SvgGallery from "../../../svg/SvgGallery/SvgGallery.jsx";

const Layout = () => {
  const data = useContext(Context);
  const setView = data["setView"];
  const view = data["view"];

  function handleViewClick(value) {
    localStorage.setItem("rerackView", value);
    setView(value);
  }

  return (
    <>
      <div className="btn-group" role="group">
        <div
          type="button"
          className={`btn customed-button ${
            view === "list" ? "active" : ""
          }`}
          title="list view"
          onClick={() => handleViewClick("list")}
        >
          <SvgList />
        </div>
        <div
          type="button"
          className={`btn customed-button ${
            view === "gallery" ? "active" : ""
          }`}
          title="galery view"
          onClick={() => handleViewClick("gallery")}
        >
          <SvgGallery />
        </div>
      </div>
    </>
  );
};

export default Layout;
