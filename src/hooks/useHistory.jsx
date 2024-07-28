import useNavigation from "./useNavigation";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Context from "../context/Context";
import {
  localStorageHistory,
  setLocalStorageHistory,
  setLocalStorageAdminPageSubRouteIndex,
  setLocalStorageAccountPageSubRouteIndex,
} from "../config/localStorage";

const useHistory = () => {
  const location = useLocation();
  const [backArrowTitle, setBackArrowTitle] = useState("");
  const { setAccoutPageSubRoute, setAdminPageSubRoute } = useContext(Context);
  const [history, setHistory] = useState(
    typeof localStorageHistory === "string"
      ? JSON.parse(localStorageHistory)
      : localStorageHistory
  );
  const {
    isNotFoundPage,
    isAdminPage,
    isSettingsPage,
    isLoginPage,
    isRegisterPage,
    isForgotPasswordPage,
    isSettingsURL,
    isAdminURL,
  } = useNavigation();

  const titleShouldBeHome = (newHistory) => {
    return newHistory[newHistory.length - 2] === "/";
  };

  const updateBackArrowTitle = (newHistory) => {
    if (titleShouldBeHome(newHistory)) setBackArrowTitle("Home");
    else setBackArrowTitle("Back");
  };

  // force cutting down the last element in the history
  const forceGoingBack = () => {
    history.length > 1 && updateHistory(history.slice(0, -1));
  };

  const updateHistory = (newHistory) => {
    setLocalStorageHistory(JSON.stringify(newHistory));
    setHistory(newHistory);
    updateBackArrowTitle(newHistory);
  };

  useEffect(() => {
    // keep back arrow title up to date even after reloading
    updateBackArrowTitle(history);

    // delete duplications from history
    if (
      history.length > 2 &&
      history[history.length - 1] === history[history.length - 2]
    ) {
      updateHistory(history.slice(0, -1));
    }

    if (location.pathname === "/") {
      // zero history when reaching home page
      updateHistory(["/"]);
      setAccoutPageSubRoute(0);
      setAdminPageSubRoute(0);
      setLocalStorageAdminPageSubRouteIndex(0);
      setLocalStorageAccountPageSubRouteIndex(0);
    } else if (location.pathname === history[history.length - 1]) {
      // avoid duplicates
      return;
    } else if (
      isLoginPage ||
      isRegisterPage ||
      (isSettingsURL(location.pathname) && isSettingsURL(history.at(-1))) ||
      (isAdminURL(location.pathname) && isAdminURL(history.at(-1)))
    ) {
      // swap register in login and vice versa
      let newHistory = history;

      if (location.pathname !== "/users/auth/forgot_password") {
        newHistory = newHistory.slice(0, -1);
      }

      newHistory.push(location.pathname);

      updateHistory(newHistory);
      return;
    } else if (isNotFoundPage) {
      // force cutting down the two last element in the history
      updateHistory(history.slice(0, -2));
    } else {
      // push to history
      let newHistory = history;
      newHistory.push(location.pathname);

      updateHistory(newHistory);
    }
  }, [
    location.pathname,
    isForgotPasswordPage,
    isNotFoundPage,
    isLoginPage,
    isRegisterPage,
    isAdminPage,
    isSettingsPage,
  ]);

  return { history, backArrowTitle, forceGoingBack };
};

export default useHistory;
