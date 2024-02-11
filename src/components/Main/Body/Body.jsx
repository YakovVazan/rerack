import { Routes, Route } from "react-router-dom";
import List from "../List/List.jsx";
import PlugPage from "../../../pages/PlugPage/PlugPage.jsx";
import NotFound from "../../../pages/NotFound/NotFound.jsx";
import PrivacyPolicy from "../../Footer/PrivacyPolicy/PrivacyPolicy.jsx";
import "./Body.css";

const Body = () => {
  return (
    <>
      <main id="main-container">
        <Routes>
          <Route path="/" element={<List />}></Route>
          <Route path="/plugs/:name" element={<PlugPage />}></Route>
          <Route path="/privacy_policy" element={<PrivacyPolicy />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </main>
    </>
  );
};

export default Body;
