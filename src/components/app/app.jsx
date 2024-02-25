import React from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import Header from "./../header/header";

// import { ShareTable } from "../share-table/share-table";
import { uuidv4, addTableList } from "../share-table/utils";

import HomePage from "../../pages/home";
import NothingSpecialPage from "../../pages/nothing-special";
import NovosibirskPage from "../../pages/novosibirsk";
import Page404 from "../../pages/404";
import ShareTablePage from "../../pages/share-table";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCreatingTable = () => {
    navigate(
      (location.pathname.match(/[/]$/)
        ? location.pathname
        : location.pathname + "/") + uuidv4()
    );
    addTableList();
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="nothing-special" element={<NothingSpecialPage />} />
        <Route path="novosibirsk" element={<NovosibirskPage />} />
        {/* <Route
          path="share-table"
          element={
            <>
              <div>
                <button type="button" onClick={handleCreatingTable}>
                  Create a table
                </button>
              </div>
            </>
          }
        /> */}
        <Route path="share-table" element={<ShareTablePage />} />
        {/* <Route
          path="share-table/:id"
          element={
            <>
              <ShareTable />
            </>
          }
        /> */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;
