import { useState } from "react";
import Context from "./context/Context.jsx";
import Nav from "./components/Header/Nav/Nav.jsx";
import Body from "./components/Main/Body/Body.jsx";
import * as vars from "./config/localStorage.js";

const App = () => {
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [typeFilterValue, setTypeFilterValue] = useState("");
  const [companyFilterValue, setCompanyFilterValue] = useState("");
  const [view, setView] = useState(vars.localStorageView);
  const [orderBy, setOrderBy] = useState(vars.localStorageOrder);
  const [orderedData, setOrderedData] = useState([]);
  const [token, setToken] = useState(vars.localStorageToken);

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
          orderBy,
          orderedData,
          searchBoxValue,
          typeFilterValue,
          companyFilterValue,
          view,
          token,
        }}
      >
        <Nav />
        <Body />
      </Context.Provider>
    </>
  );
};

export default App;
