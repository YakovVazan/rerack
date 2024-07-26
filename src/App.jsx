import { useEffect, useState } from "react";
import Context from "./context/Context.jsx";
import { consts } from "./config/constants.js";
import Nav from "./components/Header/Nav/Nav.jsx";
import Body from "./components/Main/Body/Body.jsx";
import * as localStorageVars from "./config/localStorage.js";

const App = () => {
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [typeFilterValue, setTypeFilterValue] = useState(
    consts.typeDropDownInitialValue
  );
  const [companyFilterValue, setCompanyFilterValue] = useState(
    consts.companyDropDownInitialValue
  );
  const [view, setView] = useState(localStorageVars.localStorageView);
  const [orderBy, setOrderBy] = useState(localStorageVars.localStorageOrder);
  const [orderedData, setOrderedData] = useState([]);
  const [token, setToken] = useState(localStorageVars.localStorageToken);
  const [toastVisibility, setToastVisibility] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [currentPlug, setCurrentPlug] = useState({});
  const [accountPageSubRoute, setAccoutPageSubRoute] = useState(
    +localStorageVars.localStorageAccountPageSubRouteIndex || 0
  );
  const [adminPageSubRoute, setAdminPageSubRoute] = useState(
    +localStorageVars.localStorageAdminPageSubRouteIndex || 0
  );
  const [deletionModalContents, setDeletionModalContents] = useState({});
  const [contributions, setContributions] = useState([]);
  const [activitiesHistory, setActivitiesHistory] = useState([]);
  const [adminsModalContents, setAdminsModalContents] = useState({});
  const [usersState, setUsersState] = useState([]); // to update UI state in users table
  const [theme, setTheme] = useState(localStorageVars.localStorageTheme);
  const [currentReport, setCurrentReport] = useState({});

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
    localStorageVars.setLocalStorageTheme(theme);
  });

  return (
    <>
      <Context.Provider
        value={{
          setOrderBy,
          setOrderedData,
          setSearchBoxValue,
          setTypeFilterValue,
          setCompanyFilterValue,
          setView,
          setToken,
          setToastVisibility,
          setToastMessage,
          setCurrentPlug,
          setAccoutPageSubRoute,
          setAdminPageSubRoute,
          setDeletionModalContents,
          setContributions,
          setActivitiesHistory,
          setAdminsModalContents,
          setUsersState,
          setTheme,
          setCurrentReport,
          orderBy,
          orderedData,
          searchBoxValue,
          typeFilterValue,
          companyFilterValue,
          view,
          token,
          toastVisibility,
          toastMessage,
          currentPlug,
          accountPageSubRoute,
          adminPageSubRoute,
          deletionModalContents,
          contributions,
          activitiesHistory,
          adminsModalContents,
          usersState,
          theme,
          currentReport,
        }}
      >
        <Nav />
        <Body />
      </Context.Provider>
    </>
  );
};

export default App;
