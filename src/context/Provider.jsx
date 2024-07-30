import { useState } from "react";
import Context from "./Context";
import { consts } from "../config/constants";
import * as localStorageVars from "../config/localStorage.js";

const Provider = ({ children }) => {
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
  const [socket, setSocket] = useState(null);
  const [users, setUSers] = useState([]);

  return (
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
        setSocket,
        setUSers,
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
        socket,
        users,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
