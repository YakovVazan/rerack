import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useNavigation = () => {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(null);
  const [isPlugPage, setIsPlugPage] = useState(null);

  useEffect(() => {
    setIsHomePage(location.pathname.length === 1);
    setIsPlugPage(location.pathname.split("/")[1] === "plugs");
  }, [location.pathname]);

  return { isHomePage, isPlugPage };
};

export default useNavigation;
