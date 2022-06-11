import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./../header/header";
import FunBlock from "./../fun-block/fun-block";
import Translate from "../translate/translate";
import { PhotoMap } from "../../pages/photo-map";
import PhotoSwipeWrapper from "../photoswipe/photoswipe-wrapper";

const App = () => (
  <>
    <Header />
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1 style={{textAlign: 'center'}}>There is nothing interesting</h1>
          </>
        }
      />
      <Route
        path="/nothing-special"
        element={
          <>
            <FunBlock />
            <Translate />
          </>
        }
      />
      <Route
        path="/novosibirsk"
        element={
          <>
            <PhotoMap />
            <PhotoSwipeWrapper />
          </>
        }
      />
      <Route
        path="*"
        element={
          <>
            <h1 style={{textAlign: 'center'}}>404</h1>
          </>
        }
      />
    </Routes>
  </>
);

export default App;
