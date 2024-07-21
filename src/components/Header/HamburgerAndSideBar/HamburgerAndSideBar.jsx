import { useContext } from "react";
import Context from "../../../context/Context";
import AuthAndInfo from "../../AuthAndInfo/AuthAndInfo";
import useNavigation from "../../../hooks/useNavigation";
import SvgHamburger from "../../svg/SvgHamburger/SvgHamburger";
import HomePageCtrls from "../../Aside/HomePageCtrls/HomePageCtrls";
import PlugPageCtrls from "../../Aside/PlugPageCtrls/PlugPageCtrls";
import AdminPageCtrls from "../../Aside/AdminPageCtrls/AdminPageCtrls";
import ColoredDivider from "../../Common/ColoredDivider/ColoredDivider";
import AccountCenterPageCtrls from "../../Aside/AccountCenterPageCtrls/AccountCenterPageCtrls";
import "./HamburgerAndSideBar.css";

const HamburgerAndSideBar = () => {
  const contextData = useContext(Context);
  const currentPlug = contextData["currentPlug"];
  const { isHomePage, isPlugPage, isSettingsPage, isAdminPage } =
    useNavigation();

  return (
    <>
      <div
        className="btn customed-svg"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <SvgHamburger />
      </div>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-body">
          {isHomePage && <HomePageCtrls />}
          {isPlugPage && <PlugPageCtrls currentPlug={currentPlug} />}
          {isSettingsPage && <AccountCenterPageCtrls />}
          {isAdminPage && <AdminPageCtrls />}

          <span>
            {" "}
            <ColoredDivider />
            <div id="small-screens-lower-aside">
              <AuthAndInfo />
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default HamburgerAndSideBar;
