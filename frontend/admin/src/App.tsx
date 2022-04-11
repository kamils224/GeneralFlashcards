import React, {useEffect} from "react";
import "App.scss";
import {Navigate, Route, Routes} from "react-router-dom";
import {LoginView} from "views/login/login";
import {DashboardView} from "views/dashboard/dashboard";
import {setupJwtTokens} from "utils/auth";
import {useAppDispatch, useAppSelector} from "redux-store/hooks";
import {saveAuthData} from "redux-store/slices/authSlice";
import {selectIsAuthenticated} from "redux-store/selectors/authSelectors";


function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    setupJwtTokens().then((data) => {
      if (data) {
        const authData = {
          token: data?.token,
          refreshToken: data?.refreshToken,
        };
        dispatch(saveAuthData(authData));
        // todo: set axios header
      }
    });
  }, []);
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
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
