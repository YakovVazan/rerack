import { useContext } from "react";
import Context from "../../context/Context.jsx";
import HomePageCtrls from "./HomePageCtrls/HomePageCtrls";
import PlugPageCtrls from "./PlugPageCtrls/PlugPageCtrls";
import useNavigation from "../../hooks/useNavigation.jsx";
import AccountCenterPageCtrls from "./AccountCenterPageCtrls/AccountCenterPageCtrls.jsx";
import "./Aside.css";

const Aside = () => {
  const { currentPlug } = useContext(Context);
  const { isHomePage, isPlugPage, isAccountPage } = useNavigation();

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
      {isAccountPage && (
        <aside>
          <AccountCenterPageCtrls />
        </aside>
      )}
    </>
  );
};

export default Aside;
