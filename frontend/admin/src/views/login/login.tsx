import React from "react";
import {Box, Grid} from "@mui/material";
import Colors from "styles/colors.module.scss";
import "./login.scss";

import {LoginForm} from "forms/loginForm";

export const LoginView = () => {
  return (
    <Grid container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{minHeight: "100vh"}}>
      <Box sx={{
        backgroundColor: Colors.backgroundWhite,
        minWidth: {md: 500, xs: "100%"},
        minHeight: {md: 500, xs: "100%"},
        border: 1,
      }}>
        <h2 className="header">Flashcards Admin</h2>
        <LoginForm onSuccess={() => {
          console.log("login success");
        }}
        onActionChange={(state) => console.log(state)}
        />
      </Box>
    </Grid>
  );
};
