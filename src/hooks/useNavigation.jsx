import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useNavigation = () => {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(null);
  const [isPlugPage, setIsPlugPage] = useState(null);
  const [isAccountPage, setIsAccountPage] = useState(null);

  useEffect(() => {
    setIsHomePage(location.pathname.length === 1);
    setIsPlugPage(location.pathname.split("/")[1] === "plugs");
    setIsAccountPage(
      location.pathname.split("/")[1] === "users" &&
        !isNaN(+location.pathname.split("/")[2])
    );
  }, [location.pathname]);

  return { isHomePage, isPlugPage, isAccountPage };
};

export default useNavigation;
