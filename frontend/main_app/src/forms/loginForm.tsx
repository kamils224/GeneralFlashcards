import {Button, Divider, Stack, TextField} from "@mui/material";
import React, {FormEvent, useEffect, useRef} from "react";
import authAPI, {AuthTokens} from "services/auth.api";
import {CircularLoading} from "components/loadings/circularLoading";
import useHttp from "hooks/useHttp";
import {saveAuthData} from "redux-store/slices/authSlice";
import {useAppDispatch} from "redux-store/hooks";


type Props = {
  onSuccess: () => void;
}

export const LoginForm: React.FC<Props> = (props) => {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const {onSuccess} = props;
  const {sendRequest: sendLoginRequest, pending, data: tokens, error} =
      useHttp<AuthTokens>(authAPI.getAuthTokens, false);
  const validateInput = ():boolean => {
    return !!(emailInput.current?.value && passwordInput.current?.value);
  };
  const handleLogin = () => {
    if (tokens) {
      const authData = {
        token: tokens?.token,
        refreshToken: tokens?.refreshToken,
      };
      dispatch(saveAuthData(authData));
      onSuccess();
    }
  };
  const submitLogin = (event: FormEvent) => {
    event.preventDefault();
    if (!validateInput()) {
      // todo: add error handling
      return;
    }
    const loginPayload = {
      email: emailInput.current?.value,
      password: passwordInput.current?.value,
    };
    sendLoginRequest(loginPayload);
  };

  useEffect(handleLogin, [tokens]);

  const renderForm = () => {
    if (pending) {
      return <Stack m={5} justifyContent="center" alignItems="stretch"
        height={350}><CircularLoading text="Loading"/></Stack>;
    }
    return <form onSubmit={submitLogin}>
      <Stack height={350} m={5} alignItems="stretch" justifyContent="center" spacing={2}>
        <TextField error={!!error}
          inputRef={emailInput}
          label="Email" variant="outlined"
        />
        <TextField error={!!error} helperText={error}
          inputRef={passwordInput}
          type="password" label="Password" variant="outlined"
        />
        <Button color="primary" type="submit" variant="contained">Login</Button>
        <Divider/>
        <Button color="secondary" type="submit" variant="contained">Create an account</Button>
      </Stack>
    </form>;
  };

  return <>
    {renderForm()}
  </>;
};
