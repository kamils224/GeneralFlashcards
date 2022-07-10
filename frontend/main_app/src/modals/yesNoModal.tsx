import React from "react";
import {Box, Button, Grid, Modal, Typography} from "@mui/material";
import {modalDefaults} from "styles/constants";
import CloseIcon from "@mui/icons-material/Close";
import {RightCloseButton} from "../components/buttons/rightCloseButton";

const boxStyle = {
  ...modalDefaults,
  width: {xs: 300, sm: 400},
  height: 200,
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
  const {onClose, onSuccess} = props;
  return (
    <Modal open={props.open} onClose={onClose}>
      <Box sx={boxStyle as any}>
        <RightCloseButton onClick={onClose} icon={<CloseIcon/>} color="info" tooltipText={"Close"}/>
        <Grid direction="row"
          justifyContent="center"
          alignItems="center"
          display="flex"
          mt={2} container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{textAlign: "center"}} variant="h6" >{props.message}</Typography>
          </Grid>
          <Grid textAlign="center" item xs={6}>
            <Button sx={buttonStyle} color="primary" type="submit" variant="contained">Yes</Button>
          </Grid>
          <Grid textAlign="center" item xs={6}>
            <Button sx={buttonStyle} color="error" type="submit" variant="contained">No</Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
