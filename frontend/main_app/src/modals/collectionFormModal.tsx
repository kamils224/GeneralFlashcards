import React, {useEffect} from "react";
import {Box, Modal, SxProps, Theme} from "@mui/material";
import {CollectionForm, CollectionFormData} from "forms/collectionForm";
import CloseIcon from "@mui/icons-material/Close";
import {Title} from "components/title";
import {CloseButton} from "components/buttons/closeButton";
import useHttp from "hooks/useHttp";
import collectionsApi, {CollectionDto} from "api/collections.api";
import {CircularLoading} from "components/loadings/circularLoading";
import {modalDefaults} from "styles/constants";


type Props = {
  open: boolean,
  onClose: () => any,
  onSuccess?: (data: any) => any,
}

const boxStyle = {
  ...modalDefaults,
  width: {xs: 300, sm: 500},
  height: 400,
} as SxProps<Theme>;


export const CollectionFormModal = (props: Props) => {
  const {onClose, onSuccess, open} = props;

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
              <CloseButton onClick={onClose} icon={<CloseIcon/>} color="info" tooltipText={"Close"}/>
              <Title value="Create a collection"/>
              <CollectionForm onSubmit={handleSubmit} onCancel={onClose} />
            </>;
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={boxStyle}>
        {form}
      </Box>
    </Modal>
  );
};
