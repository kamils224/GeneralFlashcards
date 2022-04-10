import {Button, Stack, TextField} from "@mui/material";
import Colors from "styles/colors.module.scss";
import React, {FormEvent, Fragment, useEffect, useRef} from "react";
import {AuthTokens, getAuthTokens} from "services/auth.api";
import {CircularLoading} from "components/loadings/circularLoading";
import useHttp from "hooks/useHttp";
import {storeAuthData} from "redux-store/slices/authSlice";
import {useAppDispatch} from "redux-store/hooks";


type Props = {
  onSuccess: () => void;
}

export const LoginForm: React.FC<Props> = (props) => {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const {onSuccess} = props;
  const {sendRequest: sendLoginRequest, pending, data, error} =
      useHttp<AuthTokens>(getAuthTokens, false);
  const validateInput = ():boolean => {
    return !!(emailInput.current?.value && passwordInput.current?.value);
  };
  const handleLogin = () => {
    if (data) {
      const authData = {
        token: data?.token,
        refreshToken: data?.refreshToken,
      };
      dispatch(storeAuthData(authData));
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

  useEffect(handleLogin, [data]);

  const renderForm = () => {
    if (pending) {
      return <CircularLoading style={{marginTop: "40%"}}/>;
    }
    return <form onSubmit={submitLogin}>
      <Stack m={5} justifyContent="center" spacing={2}>
        <TextField error={!!error}
          inputRef={emailInput}
          sx={{backgroundColor: Colors.backgroundWhite}}
          label="Email" variant="outlined"
        />
        <TextField error={!!error} helperText={error}
          inputRef={passwordInput}
          type="password" label="Password" variant="outlined"
        />
        <Button type="submit" variant="contained">Login</Button>
      </Stack>
    </form>;
  };

  return <Fragment>
    {renderForm()}
  </Fragment>;
};
