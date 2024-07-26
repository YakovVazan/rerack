import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";

const useNavigation = () => {
  const location = useLocation();
  const contextData = useContext(Context);
  const [isHomePage, setIsHomePage] = useState(false);
  const [isPlugPage, setIsPlugPage] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [isAdminPage, setIsAdminPage] = useState(false);
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const [isSettingsPage, setIsSettingsPage] = useState(false);
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);
  const [isForgotPasswordPage, setIsForgotPasswordPage] = useState(false);

  const adminPageKeyword = ["inbox", "activity", "download"];
  const authenticationKeywords = ["login", "register", "forgot_password"];
  const settingsPageKeywords = [
    "preferences",
    "reports",
    "contributions",
    "owned_plugins",
    "wishlist",
  ];

  const urlToArray = (url) => {
    return url.split("/").filter((segment) => segment !== "");
  };

  const isSettingsURL = (url) => {
    const urlArray = urlToArray(url);

    return (
      (urlArray.length == 2 &&
        urlArray[0] === "users" &&
        !isNaN(+urlArray[1])) ||
      (urlArray.length == 3 &&
        urlArray[0] === "users" &&
        !isNaN(+urlArray[1]) &&
        settingsPageKeywords.includes(urlArray[2])) ||
      (urlArray.length == 4 &&
        urlArray[0] === "users" &&
        !isNaN(+urlArray[1]) &&
        settingsPageKeywords.includes(urlArray[2]) &&
        !isNaN(+urlArray[1]))
    );
  };

  const isAdminURL = (url) => {
    const urlArray = urlToArray(url);

    return (
      (urlArray.length === 1 && urlArray[0] === "users") ||
      (urlArray.length >= 2 && adminPageKeyword.includes(urlArray[1]))
    );
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
          settingsPageKeywords.includes(url[2])) ||
        (url.length == 4 &&
          url[0] === "users" &&
          !isNaN(+url[1]) &&
          settingsPageKeywords.includes(url[2]) &&
          !isNaN(+url[3]))
    );
    setIsAdminPage(
      (url.length === 1 && url[0] === "users") ||
        (url.length >= 2 && adminPageKeyword.includes(url[1]))
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
  }, [isSettingsPage, isAdminPage, location.pathname]);

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
    isSettingsURL,
    isAdminURL,
    urlToArray,
  };
};

export default useNavigation;
