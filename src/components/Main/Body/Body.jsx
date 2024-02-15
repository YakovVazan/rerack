import { Routes, Route } from "react-router-dom";
import List from "../List/List.jsx";
import PlugPage from "../../../pages/PlugPage/PlugPage.jsx";
import NotFound from "../../../pages/NotFound/NotFound.jsx";
import LoginPage from "../../../pages/LoginPage/LoginPage.jsx";
import PrivacyPolicy from "../../Legal/PrivacyPolicy/PrivacyPolicy.jsx";
import AccountPage from "../../../pages/AccountPage/AccountPage.jsx";
import RegisterPage from "../../../pages/RegisterPage/RegisterPage.jsx";
import "./Body.css";

const Body = () => {
  return (
    <>
      <section id="main-container">
        <Routes>
          <Route path="/" element={<List />}></Route>
          <Route path="/plugs/:name" element={<PlugPage />}></Route>
          <Route path="/users/register" element={<RegisterPage />}></Route>
          <Route path="/users/login" element={<LoginPage />}></Route>
          <Route path="/users/:id" element={<AccountPage />}></Route>
          <Route path="/privacy_policy" element={<PrivacyPolicy />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </section>
    </>
  );
};

export default Body;
