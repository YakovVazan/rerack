import { useContext, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import List from "../List/List.jsx";
import Aside from "../../Aside/Aside.jsx";
import Toast from "../../Common/Toasts/Toasts.jsx";
import Context from "../../../context/Context.jsx";
import PlugPage from "../../../pages/PlugPage/PlugPage.jsx";
import NotFound from "../../../pages/NotFound/NotFound.jsx";
import useNavigation from "../../../hooks/useNavigation.jsx";
import LoginPage from "../../../pages/LoginPage/LoginPage.jsx";
import AdminsPage from "../../../pages/AdminsPage/AdminsPage.jsx";
import AddModal from "../../PlugActions/Adding/AddModal/AddModal.jsx";
import Activity from "../../../pages/AdminsPage/Activity/Activity.jsx";
import Download from "../../../pages/AdminsPage/Download/Download.jsx";
import SettingsPage from "../../../pages/SettingsPage/SettingsPage.jsx";
import PrivacyPolicy from "../../Legal/PrivacyPolicy/PrivacyPolicy.jsx";
import RegisterPage from "../../../pages/RegisterPage/RegisterPage.jsx";
import Wishlist from "../../../pages/SettingsPage/Wishlist/Wishlist.jsx";
import EditModal from "../../PlugActions/Editing/EditModal/EditModal.jsx";
import DeleteModal from "../../PlugActions/Deleting/DeleteModal/DeleteModal.jsx";
import OwnedPlugins from "../../../pages/SettingsPage/OwnedPlugins/OwnedPlugins.jsx";
import Contributions from "../../../pages/SettingsPage/Contributions/Contributions.jsx";
import "./Body.css";

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const contextData = useContext(Context);
  const { isHomePage, isPlugPage, isAccountPage, isAdminPage } =
    useNavigation();

  useEffect(() => {
    // reset current plug whenever user navigates away from plug page
    if (!location.pathname.includes("plugs")) {
      contextData["setCurrentPlug"]({});
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
          isHomePage || isPlugPage || isAccountPage || isAdminPage
            ? "wrapper"
            : ""
        }
      >
        <section id="main-container">
          <Routes>
            <Route path="/" element={<List />}></Route>
            <Route path="/plugs/:name" element={<PlugPage />}></Route>
            <Route path="/users" element={<AdminsPage />}></Route>
            <Route path="/users/activity" element={<Activity />}></Route>
            <Route path="/users/download" element={<Download />}></Route>
            <Route path="/users/register" element={<RegisterPage />}></Route>
            <Route path="/users/login" element={<LoginPage />}></Route>
            <Route path="/users/:id/" element={<SettingsPage />}></Route>
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
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>

          {/* toasts area */}
          <Toast
            toastMessage={contextData["toastMessage"]}
            toastVisibility={contextData["toastVisibility"]}
            setToastVisibility={contextData["setToastVisibility"]}
          />
        </section>
        <Aside />
      </div>

      {/* modals area */}
      <AddModal />
      <EditModal />
      <DeleteModal
        deletionModalContents={contextData["deletionModalContents"]}
      />
    </>
  );
};

export default Body;
