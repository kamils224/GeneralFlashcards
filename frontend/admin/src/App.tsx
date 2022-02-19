import React from "react";
import "App.scss";
import {Navigate, Route, Routes} from "react-router-dom";
import {LoginView} from "views/login/login";
import {DashboardView} from "views/dashboard/dashboard";
import Cookies from "js-cookie";
import {useAppDispatch} from "redux-store/hooks";
import {storeAuthData} from "redux-store/slices/authSlice";


function App() {
  const dispatch = useAppDispatch();
  const token = Cookies.get("token") || null;
  const refreshToken = Cookies.get("refreshToken") || null;
  dispatch(storeAuthData({token, refreshToken}));

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="login"/>} />
      <Route path="/login" element={<LoginView/>}/>
      <Route path="/dashboard" element={<DashboardView/>}/>
    </Routes>
  );
}

export default App;
