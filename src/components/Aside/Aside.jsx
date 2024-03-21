import { useContext } from "react";
import Context from "../../context/Context.jsx";
import HomePageCtrls from "./HomePageCtrls/HomePageCtrls";
import PlugPageCtrls from "./PlugPageCtrls/PlugPageCtrls";
import useNavigation from "../../hooks/useNavigation.jsx";
import "./Aside.css";

const Aside = () => {
  const contextData = useContext(Context);
  const currentPlug = contextData["currentPlug"];
  const { isHomePage, isPlugPage } = useNavigation();

  return (
    <>
      {isHomePage && (
        <aside>
          <HomePageCtrls />
        </aside>
      )}
      {isPlugPage && (
        <aside>
          <PlugPageCtrls currentPlug={currentPlug} />
        </aside>
      )}
    </>
  );
};

export default Aside;
