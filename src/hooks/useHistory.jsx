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
  const [history, setHistory] = useState(localStorageHistory);
  const {
    adminPageKeyword,
    settingsPageKeywords,
    isNotFoundPage,
    isLoginPage,
    isRegisterPage,
    isForgotPasswordPage,
    urlToArray,
  } = useNavigation();

  const titleShouldBeHome = (newHistory) => {
    return newHistory[newHistory.length - 2] === "/";
  };

  const updateBackArrowTitle = (newHistory) => {
    if (titleShouldBeHome(newHistory)) setBackArrowTitle("Home");
    else setBackArrowTitle("Back");
  };

  const forceGoingBack = () => {
    // force cutting down the last element in the history
    history.length > 1 && updateHistory(history.slice(0, -1));
  };

  const updateHistory = (newHistory) => {
    setLocalStorageHistory(JSON.stringify(newHistory));
    setHistory(newHistory);
    updateBackArrowTitle(newHistory);
  };

  // FIX forgot_password after login history
  // FIX back arrow title after login from plug page
  useEffect(() => {
    if (location.pathname === "/") {
      console.log(1);
      // zero history when reaching home page
      updateHistory(["/"]);
    } else if (location.pathname === history[history.length - 1]) {
      console.log(2);
      // avoid duplicates
      return;
    } else if (
      adminPageKeyword.includes(urlToArray(location.pathname).at(-1)) ||
      settingsPageKeywords.includes(urlToArray(location.pathname).at(-1))
    ) {
      console.log(3);
      // avoid adding sub routes to history
      return;
    } else if (isLoginPage || isRegisterPage) {
      console.log(4);
      // swap register in login and vice versa
      let newHistory = history;
      newHistory = newHistory.slice(0, -1);
      newHistory.push(location.pathname);

      updateHistory(newHistory);
      return;
    } else if (isNotFoundPage) {
      console.log(5);
      // force cutting down the two last element in the history
      updateHistory(history.slice(0, -2));
    } else {
      console.log(6);
      // push to history
      let newHistory =
        typeof history === "string" ? JSON.parse(history) : history;
      newHistory.push(location.pathname);

      updateHistory(newHistory);
    }
  }, [
    location.pathname,
    isForgotPasswordPage,
    isNotFoundPage,
    isLoginPage,
    isRegisterPage,
  ]);

  return { history, backArrowTitle, forceGoingBack };
};

export default useHistory;
