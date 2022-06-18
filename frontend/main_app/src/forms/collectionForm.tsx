import React from "react";
import {Button, Divider, Stack, TextField} from "@mui/material";

type Props = {
  onCancel?: () => any,
}

export const CollectionForm = (props: Props) => {
  return (
    <form onSubmit={()=> {
      console.log("submit");
    }}>
      <Stack m={5} alignItems="stretch" justifyContent="center" spacing={2}>
        <TextField
          label="Collection name" variant="outlined"
        />
        <TextField multiline maxRows={6}
          label="Description" variant="outlined"
        />
        <Button color="primary" type="submit" variant="contained">Add</Button>
        <Divider/>
        {props.onCancel && <Button onClick={() => {
          props.onCancel?.();
        }} color="secondary"
        type="button" variant="contained">Cancel</Button> }
      </Stack>
    </form>
  );
};
