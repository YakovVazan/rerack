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

  // logics to determine the history of the user while ignoring in-page navigations
  useEffect(() => {
    if (location.pathname === "/") setHistory(["/"]);
    if (url.length != 3 && url[1] === "users" && !isNaN(url[2])) return;
    if (url[1] === "users" && url[2] && isNaN(url[2])) return;

    setHistory((prevHistory) => {
      const newHistory = new Set(prevHistory);
      newHistory.add(location.pathname);
      setLocalStorageHistory(JSON.stringify(Array.from(newHistory)));
      return Array.from(newHistory);
    });
  }, [location]);

  // logics to determine the title of the back arrow in the nav bar
  useEffect(() => {
    if (history[history.length - 2] === "/") setBackArrowTitle("Home");
    else if (
      history[history.length - 2] &&
      history[history.length - 2].includes("/plugs")
    ) {
      let plugName = history[history.length - 2].split("/")[2];
      setBackArrowTitle(
        plugName.charAt(0).toUpperCase() + plugName.slice(1).replace("_", " ")
      );
    } else if (
      history[history.length - 1] === "/users" ||
      (history[history.length - 2] &&
        history[history.length - 2].includes("/users"))
    )
      setBackArrowTitle("Settings");
  }, [location, history]);

  return { history, setHistory, backArrowTitle };
};

export default useHistory;
