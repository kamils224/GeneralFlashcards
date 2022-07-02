import {Button, Divider, Stack, TextField} from "@mui/material";
import React, {FormEvent, useRef} from "react";

export interface LoginFormData {
  email?: string;
  password?: string;
}

type Props = {
  onSubmit: (payload: LoginFormData) => void;
  error?: string;
}

export const LoginForm: React.FC<Props> = (props: Props) => {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const {error, onSubmit} = props;

  const validateInput = ():boolean => {
    return !!(emailInput.current?.value && passwordInput.current?.value);
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
    onSubmit(loginPayload);
  };

  const renderForm = () => {
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
