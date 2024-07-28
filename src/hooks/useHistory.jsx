import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useNavigation from "./useNavigation";
import {
  localStorageHistory,
  setLocalStorageHistory,
} from "../config/localStorage";

const useHistory = () => {
  const location = useLocation();
  const [backArrowTitle, setBackArrowTitle] = useState("");
  const [history, setHistory] = useState(
    typeof localStorageHistory === "string"
      ? JSON.parse(localStorageHistory)
      : localStorageHistory
  );
  const {
    adminPageKeyword,
    settingsPageKeywords,
    isNotFoundPage,
    isAdminPage,
    isSettingsPage,
    isLoginPage,
    isRegisterPage,
    isForgotPasswordPage,
    isSettingsURL,
    isAdminURL,
    urlToArray,
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

    // prevent adding sub routes of admin and settings pages after reload
    if (
      (isSettingsURL(location.pathname) && isSettingsURL(history.at(-1))) ||
      (isAdminURL(location.pathname) && isAdminURL(history.at(-1)))
    ) {
      return;
    }

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
    } else if (location.pathname === history[history.length - 1]) {
      // avoid duplicates
      return;
    } else if (
      adminPageKeyword.includes(urlToArray(location.pathname).at(-1)) ||
      settingsPageKeywords.includes(urlToArray(location.pathname).at(-1))
    ) {
      if (isSettingsPage || isAdminPage) {
        // avoid adding sub routes to history
        return;
      } else {
        // add main route to history in case of navigation from outside
        let newHistory = history;
        newHistory.push(location.pathname.split("/").slice(0, -1).join("/"));

        updateHistory(newHistory);
      }
    } else if (isLoginPage || isRegisterPage) {
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
