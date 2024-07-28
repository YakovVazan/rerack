import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Reports from "./Reports/Reports";
import Personal from "./Personal/Personal";
import Wishlist from "./Wishlist/Wishlist";
import Context from "../../context/Context";
import NotFound from "../NotFound/NotFound";
import Preferences from "./Preferences/Preferences";
import OwnedPlugins from "./OwnedPlugins/OwnedPlugins";
import ReportPage from "./Reports/ReportPage/ReportPage";
import Contributions from "./Contributions/Contributions";
import { userSessionIsValid } from "../../services/sessions";
import {
  setLocalStorageAccountPageSubRouteIndex,
  localStorageAccountPageSubRouteIndex,
} from "../../config/localStorage";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setAccoutPageSubRoute } = useContext(Context);

  const checkUserSession = async () => {
    if (!(await userSessionIsValid()).ok) {
      navigate("/");
    } else {
      setLocalStorageAccountPageSubRouteIndex(0);
      setAccoutPageSubRoute(+localStorageAccountPageSubRouteIndex);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  return (
    !loading && (
      <Routes>
        <Route path=":id/" element={<Personal />}></Route>
        <Route path=":id/preferences" element={<Preferences />}></Route>
        <Route path=":id/reports" element={<Reports />}></Route>
        <Route path=":id/reports/:reportId" element={<ReportPage />}></Route>
        <Route path=":id/contributions" element={<Contributions />}></Route>
        <Route path=":id/owned_plugins" element={<OwnedPlugins />}></Route>
        <Route path=":id/wishlist" element={<Wishlist />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    )
  );
};

export default SettingsPage;
