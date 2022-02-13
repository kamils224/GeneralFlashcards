import React, {useState} from "react";
import {Box, Button, Grid, Stack, TextField} from "@mui/material";
import Colors from "styles/colors.module.scss";
import "./login.scss";

export const LoginView = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    console.log("Login handle");
    console.log(email);
    console.log(password);
  };

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
        <Stack m={5} justifyContent="center" spacing={2}>
          <TextField sx={{backgroundColor: Colors.backgroundWhite}}
            label="Email" variant="outlined"
            onChange={(e) => setEmail(e.target.value)}/>
          <TextField label="Password" variant="outlined"
            onChange={(e) => setPassword(e.target.value)}/>
          <Button variant="contained" onClick={handleLogin}>Login</Button>
        </Stack>
      </Box>
    </Grid>
  );
};
