import { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../context/Context.jsx";
import AuthAndInfo from "../AuthAndInfo/AuthAndInfo.jsx";
import HomePageCtrls from "./HomePageCtrls/HomePageCtrls";
import PlugPageCtrls from "./PlugPageCtrls/PlugPageCtrls";
import useNavigation from "../../hooks/useNavigation.jsx";
import AdminPageCtrls from "./AdminPageCtrls/AdminPageCtrls.jsx";
import ColoredDivider from "../Common/ColoredDivider/ColoredDivider.jsx";
import AccountCenterPageCtrls from "./AccountCenterPageCtrls/AccountCenterPageCtrls.jsx";
import "./Aside.css";

const Aside = () => {
  const { currentPlug } = useContext(Context);
  const { isHomePage, isPlugPage, isSettingsPage, isAdminPage } =
    useNavigation();

  return (
    <>
      <aside>
        {isHomePage && <HomePageCtrls />}
        {isPlugPage && <PlugPageCtrls currentPlug={currentPlug} />}
        {isSettingsPage && <AccountCenterPageCtrls />}
        {isAdminPage && <AdminPageCtrls />}

        <div id="lower-aside">
          <ColoredDivider />
          <div id="big-screens-lower-aside">
            <Link to={"privacy_policy"}>Privacy Policy</Link>
            <span>0.0.0</span>
          </div>
          <div id="small-screens-lower-aside">
            <AuthAndInfo />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;
