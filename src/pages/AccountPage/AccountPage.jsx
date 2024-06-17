import { useContext, useEffect } from "react";
import Personal from "./Personal/Personal";
import Context from "../../context/Context";
import {
  setLocalStorageAccountPageSubRouteIndex,
  localStorageAccountPageSubRouteIndex,
} from "../../config/localStorage";

const AccountPage = () => {
  const { setAccoutPageSubRoute } = useContext(Context);

  useEffect(() => {
    setLocalStorageAccountPageSubRouteIndex(0);
    setAccoutPageSubRoute(+localStorageAccountPageSubRouteIndex);
  }, []);

  return <Personal />;
};

export default AccountPage;
