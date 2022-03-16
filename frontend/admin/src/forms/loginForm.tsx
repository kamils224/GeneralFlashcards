import {Button, Stack, TextField} from "@mui/material";
import Colors from "styles/colors.module.scss";
import React, {FormEvent, Fragment, useState} from "react";
import {login} from "services/auth.api";
import {CircularLoading} from "components/loadings/circularLoading";
import useHttp from "hooks/use-http";
import {useAppDispatch} from "redux-store/hooks";
import {authActions} from "redux-store/slices/authSlice";


type Props = {
  onSuccess: () => void;
}

export const LoginForm = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {onSuccess} = props;
  const {sendRequest: sendLoginRequest,
    pending, data, error} = useHttp(login, false);

  const dispatch = useAppDispatch();
  const validateInput = ():boolean => {
    return !!(email && password);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (!validateInput()) {
      // todo: add error handling
      return;
    }
    await sendLoginRequest({email, password});
    if (!error) {
      dispatch(authActions.setAuthToken({
        token: data?.token,
        refreshToken: data?.refreshToken,
      },
      ));
      onSuccess();
    }
  };

  const renderForm = () => {
    if (pending) {
      return <CircularLoading style={{marginTop: "40%"}}/>;
    }
    return <form onSubmit={handleLogin}>
      <Stack m={5} justifyContent="center" spacing={2}>
        <TextField error={!!error}
          value={email}
          sx={{backgroundColor: Colors.backgroundWhite}}
          label="Email" variant="outlined"
          onChange={(e) => setEmail(e.target.value)}/>
        <TextField error={!!error} helperText={error}
          value={password}
          type="password" label="Password" variant="outlined"
          onChange={(e) => setPassword(e.target.value)}/>
        <Button type="submit" variant="contained">Login</Button>
      </Stack>
    </form>;
  };

  return <Fragment>
    {renderForm()}
  </Fragment>;
};
