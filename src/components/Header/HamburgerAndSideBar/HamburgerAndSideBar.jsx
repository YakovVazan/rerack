import useNavigation from "../../../hooks/useNavigation";
import HomePageHmbrgr from "./HomePageHmbrgr/HomePageHmbrgr";
import PlugPageHmbrgr from "./PlugPageHmbrgr/PlugPageHmbrgr";
import AccountPageHmbrgr from "./AccountPageHmbrgr/AccountPageHmbrgr";

const HamburgerAndSideBar = () => {
  const { isHomePage, isPlugPage, isAccountPage } = useNavigation();

  return (
    <>
      {isHomePage && <HomePageHmbrgr />}
      {isPlugPage && <PlugPageHmbrgr />}
      {isAccountPage && <AccountPageHmbrgr />}
    </>
  );
};

export default HamburgerAndSideBar;
