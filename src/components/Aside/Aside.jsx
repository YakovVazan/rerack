import { useContext } from "react";
import Context from "../../context/Context.jsx";
import HomePageCtrls from "./HomePageCtrls/HomePageCtrls";
import PlugPageCtrls from "./PlugPageCtrls/PlugPageCtrls";
import useNavigation from "../../hooks/useNavigation.jsx";
import AdminPageCtrls from "./AdminPageCtrls/AdminPageCtrls.jsx";
import AccountCenterPageCtrls from "./AccountCenterPageCtrls/AccountCenterPageCtrls.jsx";
import "./Aside.css";

const Aside = () => {
  const { currentPlug } = useContext(Context);
  const { isHomePage, isPlugPage, isSettingsPage, isAdminPage } =
    useNavigation();

  const asideShouldBeVisible = () => {
    return isHomePage || isPlugPage || isSettingsPage || isAdminPage;
  };

  return (
    <>
      {asideShouldBeVisible() && (
        <aside>
          {isHomePage && <HomePageCtrls />}
          {isPlugPage && <PlugPageCtrls currentPlug={currentPlug} />}
          {isSettingsPage && <AccountCenterPageCtrls />}
          {isAdminPage && <AdminPageCtrls />}
        </aside>
      )}
    </>
  );
};

export default Aside;
