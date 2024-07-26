import { useContext, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import List from "../List/List.jsx";
import Aside from "../../Aside/Aside.jsx";
import About from "../../../pages/About/About.jsx";
import Toast from "../../Common/Toasts/Toasts.jsx";
import Context from "../../../context/Context.jsx";
import PlugPage from "../../../pages/PlugPage/PlugPage.jsx";
import NotFound from "../../../pages/NotFound/NotFound.jsx";
import useNavigation from "../../../hooks/useNavigation.jsx";
import Inbox from "../../../pages/AdminsPage/Inbox/Inbox.jsx";
import LoginPage from "../../../pages/LoginPage/LoginPage.jsx";
import AdminsPage from "../../../pages/AdminsPage/AdminsPage.jsx";
import AddModal from "../../PlugActions/Adding/AddModal/AddModal.jsx";
import Reports from "../../../pages/SettingsPage/Reports/Reports.jsx";
import Activity from "../../../pages/AdminsPage/Activity/Activity.jsx";
import Download from "../../../pages/AdminsPage/Download/Download.jsx";
import SettingsPage from "../../../pages/SettingsPage/SettingsPage.jsx";
import RegisterPage from "../../../pages/RegisterPage/RegisterPage.jsx";
import Wishlist from "../../../pages/SettingsPage/Wishlist/Wishlist.jsx";
import EditModal from "../../PlugActions/Editing/EditModal/EditModal.jsx";
import PrivacyPolicy from "../../../pages/PrivacyPolicy/PrivacyPolicy.jsx";
import ForgotPswdPage from "../../../pages/ForgotPswdPage/ForgotPswdPage.jsx";
import DeleteModal from "../../PlugActions/Deleting/DeleteModal/DeleteModal.jsx";
import Preferences from "../../../pages/SettingsPage/Preferences/Preferences.jsx";
import ReplyModal from "../../../pages/AdminsPage/Inbox/ReplyModal/ReplyModal.jsx";
import OwnedPlugins from "../../../pages/SettingsPage/OwnedPlugins/OwnedPlugins.jsx";
import AdminsModal from "../../../pages/AdminsPage/Users/AdminsModal/AdminsModal.jsx";
import ReportPage from "../../../pages/SettingsPage/Reports/ReportPage/ReportPage.jsx";
import Contributions from "../../../pages/SettingsPage/Contributions/Contributions.jsx";
import NewReportModal from "../../../pages/SettingsPage/Reports/NewReportModal/NewReportModal.jsx";
import ActivitiesModal from "../../../pages/AdminsPage/Activity/ActivitiesModal/ActivitiesModal.jsx";
import ContributionsModal from "../../../pages/SettingsPage/Contributions/ContributionsModal/ContributionsModal.jsx";
import "./Body.css";

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentPlug, toastMessage, toastVisibility, setToastVisibility } =
    useContext(Context);
  const { isHomePage, isPlugPage, isSettingsPage, isAdminPage } =
    useNavigation();

  useEffect(() => {
    // reset current plug whenever user navigates away from plug page
    if (!location.pathname.includes("plugs")) {
      setCurrentPlug({});
    }

    // trim '/' from end of pathname
    if (location.pathname.endsWith("/")) {
      navigate(location.pathname.slice(0, -1), { replace: true });
    }
  }, [location.pathname]);

  return (
    <>
      <div
        className={
          isHomePage || isPlugPage || isSettingsPage || isAdminPage
            ? "main-wrapper"
            : ""
        }
      >
        <section id="main-container">
          <Routes>
            <Route path="/" element={<List />}></Route>
            <Route path="/plugs/:plugId/" element={<PlugPage />}></Route>
            <Route path="/users" element={<AdminsPage />}></Route>
            <Route path="/users/activity" element={<Activity />}></Route>
            <Route path="/users/inbox" element={<Inbox />}></Route>
            <Route
              path="/users/inbox/:reportId"
              element={<ReportPage />}
            ></Route>
            <Route path="/users/download" element={<Download />}></Route>
            <Route path="/users/register" element={<RegisterPage />}></Route>
            <Route path="/users/login" element={<LoginPage />}></Route>
            <Route
              path="/users/forgot_password"
              element={<ForgotPswdPage />}
            ></Route>
            <Route path="/users/:id/" element={<SettingsPage />}></Route>
            <Route
              path="/users/:id/preferences"
              element={<Preferences />}
            ></Route>
            <Route path="/users/:id/reports" element={<Reports />}></Route>
            <Route
              path="/users/:id/reports/:reportId"
              element={<ReportPage />}
            ></Route>
            <Route
              path="/users/:id/contributions"
              element={<Contributions />}
            ></Route>
            <Route
              path="/users/:id/owned_plugins"
              element={<OwnedPlugins />}
            ></Route>
            <Route path="/users/:id/wishlist" element={<Wishlist />}></Route>
            <Route path="/privacy_policy" element={<PrivacyPolicy />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>

          {/* toasts area */}
          <Toast
            toastMessage={toastMessage}
            toastVisibility={toastVisibility}
            setToastVisibility={setToastVisibility}
          />
        </section>
        <Aside />
      </div>

      {/* modals area */}
      {isHomePage && <AddModal />}
      {isPlugPage && <EditModal />}
      {isSettingsPage && <NewReportModal />}
      {isSettingsPage && <ContributionsModal />}
      {isAdminPage && <AdminsModal />}
      {isAdminPage && <ReplyModal />}
      {isAdminPage && <ActivitiesModal />}
      {(isPlugPage || isSettingsPage || isAdminPage) && <DeleteModal />}
    </>
  );
};

export default Body;
