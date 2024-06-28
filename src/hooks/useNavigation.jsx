import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";

const useNavigation = () => {
  const location = useLocation();
  const contextData = useContext(Context);
  const [isHomePage, setIsHomePage] = useState(null);
  const [isPlugPage, setIsPlugPage] = useState(null);
  const [isLoginPage, setIsLoginPage] = useState(null);
  const [isAdminPage, setIsAdminPage] = useState(null);
  const [isRegisterPage, setIsRegisterPage] = useState(null);
  const [isSettingsPage, setIsSettingsPage] = useState(null);
  const [isNotFoundPage, setIsNotFoundPage] = useState(null);
  const [isAdminPageSubRoute, setIsAdminPageSubRoute] = useState(null);
  const [isForgotPasswordPage, setIsForgotPasswordPage] = useState(null);

  const adminPageKeyword = ["activity", "download"];
  const authenticationKeywords = ["login", "register", "forgot_password"];
  const settingsPageKeywords = ["contributions", "owned_plugins", "wishlist"];

  const urlToArray = (url) => {
    return url.split("/").filter((segment) => segment !== "");
  };

  let url = urlToArray(location.pathname);

  // determine which page is the current
  useEffect(() => {
    setIsForgotPasswordPage(location.pathname === "/users/forgot_password");
    setIsLoginPage(location.pathname === "/users/login");
    setIsRegisterPage(location.pathname === "/users/register");
    setIsHomePage(location.pathname === "/");
    setIsPlugPage(url.length == 2 && url[0] === "plugs" && !isNaN(+url[1]));
    setIsSettingsPage(
      (url.length == 2 && url[0] === "users" && !isNaN(+url[1])) ||
        (url.length == 3 &&
          url[0] === "users" &&
          !isNaN(+url[1]) &&
          settingsPageKeywords.includes(url[2]))
    );
    setIsAdminPage(
      (url.length === 1 && url[0] === "users") ||
        (url.length === 2 && adminPageKeyword.includes(url[1]))
    );
    setIsAdminPageSubRoute(
      isAdminPage &&
        url.length === 2 &&
        url[0] === "users" &&
        adminPageKeyword.includes(url[1])
    );
    setIsNotFoundPage(url.length === 1 && url[0] === "not-found");
  }, [location.pathname]);

  // align sub route visuals with url browsing
  useEffect(() => {
    if (isSettingsPage) {
      contextData["setAccoutPageSubRoute"](
        settingsPageKeywords.indexOf(url[2]) + 1
      );
    } else if (isAdminPage) {
      contextData["setAdminPageSubRoute"](adminPageKeyword.indexOf(url[1]) + 1);
    }
  }, [isSettingsPage, isAdminPage, isAdminPageSubRoute, location.pathname]);

  return {
    adminPageKeyword,
    settingsPageKeywords,
    authenticationKeywords,
    isForgotPasswordPage,
    isLoginPage,
    isRegisterPage,
    isHomePage,
    isPlugPage,
    isSettingsPage,
    isAdminPage,
    isNotFoundPage,
    isAdminPageSubRoute,
    urlToArray,
  };
};

export default useNavigation;
