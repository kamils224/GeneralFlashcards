import React, {useEffect} from "react";
import {Box, Grid, Stack} from "@mui/material";
import Colors from "styles/colors.module.scss";
import {LoginForm, LoginFormData} from "forms/loginForm";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "routes/routeNames";
import {Title} from "components/title";
import useHttp from "../../hooks/useHttp";
import authAPI, {AuthTokens} from "../../api/auth.api";
import {saveAuthData} from "../../redux-store/slices/authSlice";
import {useAppDispatch} from "../../redux-store/hooks";
import {CircularLoading} from "../../components/loadings/circularLoading";

const boxStyle = {
  backgroundColor: Colors.backgroundSecondary,
  minWidth: {md: 500, xs: "100%"},
  minHeight: {md: 500, xs: "100%"},
  boxShadow: 5,
};

export const LoginView = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {sendRequest: sendLoginRequest, pending, data: tokens, error} =
      useHttp<AuthTokens>(authAPI.getAuthTokens, false);

  const handleSubmit = (loginPayload: LoginFormData) => {
    sendLoginRequest(loginPayload);
  };
  const handleLogin= () => {
    if (tokens) {
      const authData = {
        token: tokens?.token,
        refreshToken: tokens?.refreshToken,
      };
      dispatch(saveAuthData(authData));
      navigate(RouteNames.dashboard, {replace: true});
    }
  };
  useEffect(handleLogin, [tokens]);

  return (
    <Grid container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{minHeight: "70vh"}}>
      <Box alignItems="center" justifyContent="center" sx={boxStyle}>
        <Title value="Log in to start"/>
        {pending ?
            <Stack m={5} justifyContent="center" alignItems="stretch"
              height={350}><CircularLoading text="Loading"/></Stack> :
            <LoginForm onSubmit={handleSubmit} error={error} />
        }
      </Box>
    </Grid>
  );
};
