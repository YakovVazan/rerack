import { Routes, Route } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import ForgotPswdPage from "./ForgotPswdPage/ForgotPswdPage";

const AuthPages = () => {
  return (
    <Routes>
      <Route path="register" element={<RegisterPage />}></Route>
      <Route path="login" element={<LoginPage />}></Route>
      <Route path="forgot_password" element={<ForgotPswdPage />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default AuthPages;
