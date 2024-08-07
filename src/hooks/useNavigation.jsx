import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useNavigation = () => {
  const location = useLocation();
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

  const isReportNotInbox = () => {
    return !urlToArray(location.pathname).includes("inbox");
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

    return urlArray.includes("dashboard");
  };

  const isReportURL = (url) => {
    const urlArray = urlToArray(url);

    return (
      urlArray.length === 4 &&
      urlArray.length == 4 &&
      urlArray[0] === "users" &&
      !isNaN(+urlArray[1]) &&
      urlArray[2] === "reports" &&
      !isNaN(+urlArray[1])
    );
  };

  let url = urlToArray(location.pathname);

  // determine which page is the current
  useEffect(() => {
    setIsForgotPasswordPage(
      location.pathname === "/users/auth/forgot_password"
    );
    setIsLoginPage(location.pathname === "/users/auth/login");
    setIsRegisterPage(location.pathname === "/users/auth/register");
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
      (url.length === 2 && url.includes("dashboard")) ||
        (url.length >= 3 && adminPageKeyword.includes(url[2]))
    );
    setIsNotFoundPage(url.length === 1 && url[0] === "not-found");
  }, [location.pathname]);

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
    isReportURL,
    isAdminURL,
    urlToArray,
    isReportNotInbox,
  };
};

export default useNavigation;
