import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import List from "../List/List.jsx";
import Toast from "../../Common/Toasts/Toasts.jsx";
import Context from "../../../context/Context.jsx";
import PlugPage from "../../../pages/PlugPage/PlugPage.jsx";
import NotFound from "../../../pages/NotFound/NotFound.jsx";
import LoginPage from "../../../pages/LoginPage/LoginPage.jsx";
import AdminsPage from "../../../pages/AdminsPage/AdminsPage.jsx";
import AccountPage from "../../../pages/AccountPage/AccountPage.jsx";
import AddModal from "../../PlugActions/Adding/AddModal/AddModal.jsx";
import PrivacyPolicy from "../../Legal/PrivacyPolicy/PrivacyPolicy.jsx";
import RegisterPage from "../../../pages/RegisterPage/RegisterPage.jsx";
import EditModal from "../../PlugActions/Editing/EditModal/EditModal.jsx";
import "./Body.css";

const Body = () => {
  const contextData = useContext(Context);

  return (
    <>
      <section id="main-container">
        <Routes>
          <Route path="/" element={<List />}></Route>
          <Route path="/plugs/:name" element={<PlugPage />}></Route>
          <Route path="/users" element={<AdminsPage />}></Route>
          <Route path="/users/register" element={<RegisterPage />}></Route>
          <Route path="/users/login" element={<LoginPage />}></Route>
          <Route path="/users/:id" element={<AccountPage />}></Route>
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

      {/* modal area */}
      <AddModal />
      <EditModal />
    </>
  );
};

export default Body;
