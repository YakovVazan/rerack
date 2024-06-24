import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  localStorageHistory,
  setLocalStorageHistory,
} from "../config/localStorage";

const useHistory = () => {
  const location = useLocation();
  const url = location.pathname.split("/");
  const [history, setHistory] = useState(
    JSON.parse(localStorageHistory) || ["/"]
  );
  const [backArrowTitle, setBackArrowTitle] = useState("");

  const isHomeTitle = () => {
    return history.length >= 2 && history[history.length - 2] === "/";
  };

  const isPlugTitle = () => {
    return (
      history[history.length - 2] &&
      history[history.length - 2].includes("/plugs")
    );
  };

  const isSettingsTitle = () => {
    return (
      history[history.length - 1] === "/users" ||
      (history[history.length - 2] &&
        history[history.length - 2].includes("/users"))
    );
  };

  // logics to determine the history of the user while ignoring in-page navigations
  useEffect(() => {
    // prevent adding to history for login-to-register navigation and vice versa
    if (
      (location.pathname.includes("login") &&
        history[history.length - 1].includes("register")) ||
      (location.pathname.includes("register") &&
        history[history.length - 1].includes("login"))
    ) {
      let newHistory = history;
      newHistory[newHistory.length - 1] = location.pathname;
      setLocalStorageHistory(JSON.stringify(newHistory));
      setHistory(newHistory);
      return;
    }
    // zero out the history whenever the user navigates to the home page
    if (location.pathname === "/") {
      setLocalStorageHistory(JSON.stringify(["/"]));
      setHistory(["/"]);
      return;
    }
    // prevent adding to history for subroutings in settings page
    if (url.length != 3 && url[1] === "users" && !isNaN(url[2])) return;
    // add properly to history when login comes after plug page
    if (
      history.length == 3 &&
      history[1].includes("plugs") &&
      history[2].includes("login")
    ) {
      setLocalStorageHistory(JSON.stringify(history.slice(0, -1)));
      setHistory(history.slice(0, -1));
      return;
    }

    const historySet = new Set(history);
    historySet.add(location.pathname);
    const historyArray = Array.from(historySet);

    setLocalStorageHistory(JSON.stringify(historyArray));
    setHistory(historyArray);
  }, [location.pathname]);

  // logics to determine the title of the back arrow in the nav bar
  useEffect(() => {
    if (isHomeTitle()) setBackArrowTitle("Home");
    else if (isPlugTitle()) {
      let plugName = history[history.length - 2].split("/")[2];
      setBackArrowTitle(
        plugName.charAt(0).toUpperCase() + plugName.slice(1).replace("_", " ")
      );
    } else if (isSettingsTitle()) setBackArrowTitle("Settings");
  }, [location, history]);

  return { history, setHistory, backArrowTitle };
};

export default useHistory;
