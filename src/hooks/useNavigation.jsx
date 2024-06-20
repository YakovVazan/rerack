import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";

const useNavigation = () => {
  const location = useLocation();
  const contextData = useContext(Context);
  const [isHomePage, setIsHomePage] = useState(null);
  const [isPlugPage, setIsPlugPage] = useState(null);
  const [isAccountPage, setIsAccountPage] = useState(null);
  const [isAdminPage, setIsAdminPage] = useState(null);

  const adminPageKeyword = ["activity", "download"];
  const settingsKeywords = ["contributions", "owned_plugs", "wishlist"];

  let url = location.pathname.split("/");

  useEffect(() => {
    setIsHomePage(location.pathname.length === 1);
    setIsPlugPage(url[1] === "plugs");
    setIsAccountPage(url[1] === "users" && !isNaN(+url[2]));
    setIsAdminPage(
      (url.length === 2 && url[1] === "users") ||
        (url.length === 3 && adminPageKeyword.includes(url[2]))
    );
  }, [location.pathname]);

  // align sub route visuals with url browsing
  useEffect(() => {
    if (isAccountPage) {
      contextData["setAccoutPageSubRoute"](
        settingsKeywords.indexOf(url[3]) + 1
      );
    } else if (isAdminPage) {
      contextData["setAdminPageSubRoute"](adminPageKeyword.indexOf(url[2]) + 1);
    }
  }, [isAccountPage, isAdminPage]);

  return { isHomePage, isPlugPage, isAccountPage, isAdminPage };
};

export default useNavigation;
