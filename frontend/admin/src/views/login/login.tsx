import React, {useState} from "react";
import {Box, Button, Grid, Stack, TextField} from "@mui/material";
import Colors from "styles/colors.module.scss";
import "./login.scss";
import authService from "api/auth";
import {storeAuthData} from "redux-store/slices/authSlice";
import {useAppDispatch} from "redux-store/hooks";

export const LoginView = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleLogin = async (event:any) => {
    event.preventDefault();
    setError("");
    try {
      const authData = await authService.login(email, password);
      dispatch(storeAuthData(authData));
    } catch (error) {
      setError("Invalid email or password.");
    }
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
        <form>
          <Stack m={5} justifyContent="center" spacing={2}>
            <TextField error={!!error}
              sx={{backgroundColor: Colors.backgroundWhite}}
              label="Email" variant="outlined"
              onChange={(e) => setEmail(e.target.value)}/>
            <TextField error={!!error} helperText={error}
              type="password" label="Password" variant="outlined"
              onChange={(e) => setPassword(e.target.value)}/>
            <Button type="submit" variant="contained"
              onClick={handleLogin}>Login</Button>
          </Stack>
        </form>
      </Box>
    </Grid>
  );
};
