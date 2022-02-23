import {Button, Stack, TextField} from "@mui/material";
import Colors from "../styles/colors.module.scss";
import React, {FormEvent, Fragment, useState} from "react";
import authService from "services/auth.service";
import {CircularLoading} from "components/loadings/circularLoading";


type Props = {
  onSuccess: () => void;
}

export const LoginForm = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {onSuccess} = props;

  const validateInput = ():boolean => {
    return !!(email && password);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!validateInput()) {
      console.log("return");
      return;
    }
    try {
      setIsLoading(true);
      await authService.login(email, password);
      setIsLoading(false);
      onSuccess();
    } catch (error) {
      console.log(error);
      setError("Invalid email or password.");
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    if (isLoading) {
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
