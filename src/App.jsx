import { useState } from "react";
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
        }}
      >
        <Nav />
        <Body />
      </Context.Provider>
    </>
  );
};

export default App;
