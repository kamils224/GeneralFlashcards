import React from "react";
import "App.scss";
import {Route, Routes} from "react-router-dom";
import {LoginView} from "views/login/login";

// eslint-disable-next-line require-jsdoc
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<LoginView/>}/>
      </Routes>
    </div>
  );
}

export default App;
