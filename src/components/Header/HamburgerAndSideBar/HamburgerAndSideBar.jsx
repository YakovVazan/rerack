import useNavigation from "../../../hooks/useNavigation";
import HomePageHmbrgr from "./HomePageHmbrgr/HomePageHmbrgr";
import PlugPageHmbrgr from "./PlugPageHmbrgr/PlugPageHmbrgr";

const HamburgerAndSideBar = () => {
  const { isHomePage, isPlugPage } = useNavigation();

  return (
    <>
      {isHomePage && <HomePageHmbrgr />}
      {isPlugPage && <PlugPageHmbrgr />}
    </>
  );
};

export default HamburgerAndSideBar;
