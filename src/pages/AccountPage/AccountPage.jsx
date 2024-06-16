import { useContext, useEffect } from "react";
import Personal from "./Personal/Personal";
import Wishlist from "./Wishlist/Wishlist";
import Context from "../../context/Context";
import Contributions from "./Contributions/Contributions";
import OwnedPlugins from "./OwnedPlugins/OwnedPlugins";

const AccountPage = () => {
  const { accountPageSubRoute, setAccoutPageSubRoute } = useContext(Context);

  useEffect(() => {
    setAccoutPageSubRoute(0);
  }, []);

  switch (accountPageSubRoute) {
    case 0:
      return <Personal />;
    case 1:
      return <Contributions />;
    case 2:
      return <OwnedPlugins />;
    case 3:
      return <Wishlist />;
  }
};

export default AccountPage;
