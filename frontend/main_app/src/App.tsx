import React, {Fragment} from "react";
import "App.scss";
import {Navigate, Route, Routes} from "react-router-dom";
import {LoginView} from "views/login/login";
import {DashboardView} from "views/dashboard/dashboard";
import {useRefreshAuthTokens} from "hooks/auth/useRefreshAuth";
import {NavigationBar} from "./components/navigationBar";


function App() {
  useRefreshAuthTokens();
  // todo: add router guard

  return (
    <Fragment>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<Navigate replace to="login"/>} />
        <Route path="/login" element={<LoginView/>}/>
        <Route path="/dashboard" element={<DashboardView/>}/>
      </Routes>
    </Fragment>
  );
}

export default App;
