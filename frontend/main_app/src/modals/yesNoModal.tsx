import React from "react";
import {Box, Button, Grid, Stack, Modal, Typography} from "@mui/material";
import {modalDefaults} from "styles/constants";
import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "components/buttons/iconButton";

const boxStyle = {
  ...modalDefaults,
  width: {xs: 300, sm: 400},
  minHeight: 150,
};

const buttonStyle = {
  minWidth: 100,
};

type Props = {
  open: boolean,
  onClose: () => any,
  onSuccess?: (data: any) => any,
  message: string,
}


export const YesNoModal = (props: Props) => {
  const {onClose, onSuccess, open} = props;
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={boxStyle as any}>
        <IconButton onClick={onClose} icon={<CloseIcon/>} color="info" tooltipText={"Close"}/>
        <Stack direction="column" justifyContent="space-between" spacing={2} alignItems="stretch">
          <Typography sx={{textAlign: "center"}} variant="h6" >{props.message}</Typography>
          <Stack direction="row" justifyContent="space-around">
            <Button onClick={onSuccess} sx={buttonStyle} color="primary" type="submit" variant="contained">Yes</Button>
            <Button onClick={onClose} sx={buttonStyle} color="error" type="submit" variant="contained">No</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};
