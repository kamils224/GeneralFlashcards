import {Button, Stack, TextField} from "@mui/material";
import Colors from "../styles/colors.module.scss";
import React, {FormEvent, useState} from "react";
import {useAppDispatch} from "redux-store/hooks";
import authService from "api/auth";
import {storeAuthData} from "redux-store/slices/authSlice";

enum LoginState {
  Success,
  Loading,
  Error,
}

type Props = {
  onActionChange: (state: LoginState) => void;
  onSuccess: () => void;
}

export const LoginForm = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    const {onActionChange, onSuccess} = props;

    try {
      onActionChange(LoginState.Loading);
      const authData = await authService.login(email, password);
      dispatch(storeAuthData(authData));
      onActionChange(LoginState.Success);
      onSuccess();
    } catch (error) {
      setError("Invalid email or password.");
      onActionChange(LoginState.Error);
    }
  };
  return <form>
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
  </form>;
};
