import { useContext, useEffect } from "react";
import Users from "./Users/Users";
import Context from "../../context/Context";
import {
  setLocalStorageAdminPageSubRouteIndex,
  localStorageAdminPageSubRouteIndex,
} from "../../config/localStorage";

const AdminsPage = () => {
  const { setAdminPageSubRoute } = useContext(Context);

  useEffect(() => {
    setLocalStorageAdminPageSubRouteIndex(0);
    setAdminPageSubRoute(+localStorageAdminPageSubRouteIndex);
  }, []);

  return <Users />;
};

export default AdminsPage;
