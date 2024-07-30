import { useContext, useEffect } from "react";
import { setLocalStorageTheme } from "../config/localStorage";
import Context from "../context/Context";

const useTheme = () => {
  const { theme } = useContext(Context);
  
  useEffect(() => {
    if (
      (theme === "machine" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) ||
      theme === "dark"
    ) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    setLocalStorageTheme(theme);
  }, [theme]);
};

export default useTheme;
