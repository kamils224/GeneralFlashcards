import React, {useRef} from "react";
import {Button, Divider, Stack, TextField} from "@mui/material";

export interface CollectionFormData {
    title: string;
}

type Props = {
  onCancel?: () => any;
  onSubmit: (formData: CollectionFormData) => any;
}

export const CollectionForm = (props: Props) => {
  const titleInput = useRef<HTMLInputElement>(null);
  const {onSubmit} = props;

  return (
    <form onSubmit={(e)=> {
      e.preventDefault();
      onSubmit({title: titleInput.current?.value || ""});
    }}>
      <Stack m={5} alignItems="stretch" justifyContent="center" spacing={2}>
        <TextField required label="Collection name" variant="outlined" inputRef={titleInput}/>
        <Button color="primary" type="submit" variant="contained">Add</Button>
        <Divider/>
        {props.onCancel && <Button onClick={() => {
          props.onCancel?.();
        }} color="error"
        type="button" variant="contained">Cancel</Button> }
      </Stack>
    </form>
  );
};
