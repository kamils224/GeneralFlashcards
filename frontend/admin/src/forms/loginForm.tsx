import {Button, Stack, TextField} from "@mui/material";
import Colors from "../styles/colors.module.scss";
import React, {FormEvent, Fragment, useState} from "react";
import {useAppDispatch} from "redux-store/hooks";
import authService from "api/auth";
import {storeAuthData} from "redux-store/slices/authSlice";
import {CircularLoading} from "components/loadings/circularLoading";


type Props = {
  onSuccess: () => void;
}

export const LoginForm = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {onSuccess} = props;

  const validateInput = ():boolean => {
    return !!(email && password);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!validateInput()) {
      return;
    }
    try {
      setIsLoading(true);
      const authData = await authService.login(email, password);
      dispatch(storeAuthData(authData));
      setIsLoading(false);
      onSuccess();
    } catch (error) {
      setError("Invalid email or password.");
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    if (isLoading) {
      return <CircularLoading style={{marginTop: "40%"}}/>;
    }
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

  return <Fragment>
    {renderForm()}
  </Fragment>;
};