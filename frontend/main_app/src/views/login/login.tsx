import React, {useCallback} from "react";
import {Box, Grid} from "@mui/material";
import Colors from "styles/colors.module.scss";
import {LoginForm} from "forms/loginForm";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "routes/routeNames";
import {Title} from "components/title";

const boxStyle = {
  backgroundColor: Colors.backgroundSecondary,
  minWidth: {md: 500, xs: "100%"},
  minHeight: {md: 500, xs: "100%"},
  boxShadow: 5,
};

export const LoginView = () => {
  const navigate = useNavigate();
  const handleLoginSuccess = useCallback(() => {
    navigate(RouteNames.dashboard, {replace: true});
  }, []);

  return (
    <Grid container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{minHeight: "70vh"}}>
      <Box alignItems="center" justifyContent="center" sx={boxStyle}>
        <Title value="Log in to start"/>
        <LoginForm onSuccess={handleLoginSuccess} />
      </Box>
    </Grid>
  );
};
