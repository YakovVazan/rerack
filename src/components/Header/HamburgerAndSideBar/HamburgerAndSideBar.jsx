import useNavigation from "../../../hooks/useNavigation";
import HomePageHmbrgr from "./HomePageHmbrgr/HomePageHmbrgr";
import PlugPageHmbrgr from "./PlugPageHmbrgr/PlugPageHmbrgr";
import AdminPageHmbrgr from "./AdminPageHmbrgr/AdminPageHmbrgr";
import AccountPageHmbrgr from "./AccountPageHmbrgr/AccountPageHmbrgr";

const HamburgerAndSideBar = () => {
  const { isHomePage, isPlugPage, isAccountPage, isAdminPage } = useNavigation();

  return (
    <>
      {isHomePage && <HomePageHmbrgr />}
      {isPlugPage && <PlugPageHmbrgr />}
      {isAccountPage && <AccountPageHmbrgr />}
      {isAdminPage && <AdminPageHmbrgr />}
    </>
  );
};

export default HamburgerAndSideBar;
