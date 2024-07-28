import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Users from "./Users/Users";
import Inbox from "./Inbox/Inbox";
import Activity from "./Activity/Activity";
import Download from "./Download/Download";
import Context from "../../context/Context";
import NotFound from "../NotFound/NotFound";
import { isUserAdmin } from "../../services/sessions";
import ReportPage from "../SettingsPage/Reports/ReportPage/ReportPage";
import {
  localStorageAdminPageSubRouteIndex,
  setLocalStorageAdminPageSubRouteIndex,
} from "../../config/localStorage";

const AdminsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setAdminPageSubRoute } = useContext(Context);

  const makeSureUserIsAdmin = async () => {
    if (!(await isUserAdmin()).ok) {
      navigate("/");
    } else {
      setLocalStorageAdminPageSubRouteIndex(
        +localStorageAdminPageSubRouteIndex || 0
      );
      setAdminPageSubRoute(+localStorageAdminPageSubRouteIndex);
      setLoading(false);
    }
  };

  useEffect(() => {
    makeSureUserIsAdmin();
  }, []);

  return (
    !loading && (
      <Routes>
        <Route path="" element={<Users />}></Route>
        <Route path="activity" element={<Activity />}></Route>
        <Route path="inbox" element={<Inbox />}></Route>
        <Route path="inbox/:reportId" element={<ReportPage />}></Route>
        <Route path="download" element={<Download />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    )
  );
};

export default AdminsPage;
