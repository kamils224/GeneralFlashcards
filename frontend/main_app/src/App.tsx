import React from "react";
import "App.scss";
import {Navigate, Route, Routes} from "react-router-dom";
import {LoginView} from "views/login/login";
import {DashboardView} from "views/dashboard/dashboard";
import {useRefreshAuthTokens} from "hooks/auth/useRefreshAuth";


function App() {
  const isLoggedIn = useRefreshAuthTokens();

  console.log("Render component");
  console.log(isLoggedIn); // todo
  // todo: add router guard

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="login"/>} />
      <Route path="/login" element={<LoginView/>}/>
      <Route path="/dashboard" element={<DashboardView/>}/>
    </Routes>
  );
}

export default App;
