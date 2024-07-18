import useNavigation from "../../../hooks/useNavigation";
import HomePageHmbrgr from "./HomePageHmbrgr/HomePageHmbrgr";
import PlugPageHmbrgr from "./PlugPageHmbrgr/PlugPageHmbrgr";
import AdminPageHmbrgr from "./AdminPageHmbrgr/AdminPageHmbrgr";
import AccountPageHmbrgr from "./AccountPageHmbrgr/AccountPageHmbrgr";
import './HamburgerAndSideBar.css'

const HamburgerAndSideBar = () => {
  const { isHomePage, isPlugPage, isSettingsPage, isAdminPage } =
    useNavigation();

  return (
    <>
      {isHomePage && <HomePageHmbrgr />}
      {isPlugPage && <PlugPageHmbrgr />}
      {isSettingsPage && <AccountPageHmbrgr />}
      {isAdminPage && <AdminPageHmbrgr />}
    </>
  );
};

export default HamburgerAndSideBar;
