import React from "react";
import "App.scss";
import {Route, Routes} from "react-router-dom";
import {LoginView} from "views/login/login";
import {DashboardView} from "views/dashboard/dashboard";
import {useRefreshAuthTokens} from "hooks/auth/useRefreshAuth";
import {NavigationBar} from "components/navigationBar";
import {RouteNames} from "routes/routeNames";
import PrivateRoute from "routes/privateRoute";
import PublicOnlyRoute from "routes/publicOnlyRoute";
import {Container} from "@mui/material";


function App() {
  useRefreshAuthTokens();

  return (
    <>
      <NavigationBar />
      <Container disableGutters maxWidth={false}>
        <Routes>
          <Route path={RouteNames.home} element={<PrivateRoute/>}>
            <Route path={RouteNames.dashboard} element={<DashboardView/>}/>
          </Route>
          <Route path={RouteNames.home} element={<PublicOnlyRoute/>}>
            <Route path={RouteNames.login} element={<LoginView/>}/>
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
