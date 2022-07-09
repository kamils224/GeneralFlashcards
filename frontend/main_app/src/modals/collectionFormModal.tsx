import React, {useEffect} from "react";
import {Box, Modal, SxProps, Theme} from "@mui/material";
import {CollectionForm, CollectionFormData} from "forms/collectionForm";
import CloseIcon from "@mui/icons-material/Close";
import {Title} from "components/title";
import Colors from "styles/colors.module.scss";
import {CustomIconButton} from "components/buttons/customIconButton";
import useHttp from "hooks/useHttp";
import collectionsApi, {CollectionDto} from "api/collections.api";
import {CircularLoading} from "components/loadings/circularLoading";


type Props = {
  open: boolean,
  onClose: () => any,
  onSuccess?: (data: any) => any,
}

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -85%)",
  width: {xs: 400, sm: 500},
  height: 400,
  bgcolor: Colors.backgroundSecondary,
  boxShadow: 24,
  p: 2,
} as SxProps<Theme>;


export const CollectionFormModal = (props: Props) => {
  const {onClose, onSuccess} = props;
  const handleClose = () => onClose();

  const {sendRequest: sendCreateCollection, pending, data: newCollection, error} =
      useHttp<CollectionDto>(collectionsApi.createCollection, false);

  const handleSubmit = (payload: CollectionFormData) => {
    sendCreateCollection({title: payload.title, description: payload.description});
  };
  const handleSuccess = () => {
    if (newCollection) {
      onSuccess?.(newCollection);
    }
  };
  useEffect(handleSuccess, [newCollection]);

  const handleResponse = () => {
    if (newCollection) {
      console.log(newCollection);
      props.onClose();
    } else if (error) {
      console.log(error);
    }
  };

  useEffect(handleResponse, [newCollection, error]);

  const form = pending ? <CircularLoading/> :
            <>
              <CustomIconButton onClick={handleClose} icon={<CloseIcon/>} color="info" tooltipText={"Close"}/>
              <Title value="Create a collection"/>
              <CollectionForm onSubmit={handleSubmit} onCancel={handleClose} />
            </>;
  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyle}>
        {form}
      </Box>
    </Modal>
  );
};
