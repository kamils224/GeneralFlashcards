import React, {useCallback} from "react";
import {Box, Grid, Typography} from "@mui/material";
import Colors from "styles/colors.module.scss";
import {LoginForm} from "forms/loginForm";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "routes/routeNames";

const boxStyle = {
  backgroundColor: Colors.backgroundSecondary,
  minWidth: {md: 500, xs: "100%"},
  minHeight: {md: 500, xs: "100%"},
  boxShadow: 5,
};
const headerStyle = {
  marginTop: 2,
  textAlign: "center",
  fontWeight: "bold",
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
        <Typography variant="h4" sx={headerStyle}>Log in to start</Typography>
        <LoginForm onSuccess={handleLoginSuccess} />
      </Box>
    </Grid>
  );
};
