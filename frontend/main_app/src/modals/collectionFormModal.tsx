import React from "react";
import {Box, Modal} from "@mui/material";
import {CollectionForm} from "forms/collectionForm";
import CloseIcon from "@mui/icons-material/Close";
import {Title} from "components/title";
import Colors from "styles/colors.module.scss";
import {CustomIconButton} from "../components/buttons/customIconButton";


type Props = {
  open: boolean,
  onClose: () => any,
}

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 400,
  bgcolor: Colors.backgroundSecondary,
  boxShadow: 24,
  p: 3,
};


export const CollectionFormModal = (props: Props) => {
  const handleClose = () => props.onClose();
  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyle}>
        <CustomIconButton onClick={handleClose} icon={<CloseIcon/>} color="info" tooltipText={"Close"}/>
        <Title value="Create a collection"/>
        <CollectionForm onCancel={handleClose} />
      </Box>
    </Modal>
  );
};
