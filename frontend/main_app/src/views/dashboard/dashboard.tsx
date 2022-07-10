import React, {useEffect, useMemo, useState} from "react";
import {Grid, useMediaQuery, useTheme} from "@mui/material";
import {CollectionCard} from "views/dashboard/components/collectionCard";
import collectionsApi, {CollectionDto} from "api/collections.api";
import {CircularLoading} from "components/loadings/circularLoading";
import useHttp from "hooks/useHttp";
import {ActionItem, ActionsBar} from "views/dashboard/components/actionsBar";
import {CollectionFormModal} from "modals/collectionFormModal";
import {YesNoModal} from "modals/yesNoModal";

export const DashboardView = () => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));
  const {sendRequest: getCollections, pending: loadingCollections, data: collections} =
      useHttp(collectionsApi.getCollections, true);
  const {sendRequest: removeCollection, pending: removingCollection} =
      useHttp(collectionsApi.removeCollection);
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<CollectionDto | null>(null);

  const actions = useMemo(() => [
    {
      title: "Add new collection",
      onClick: () => {
        setCollectionModalOpen(true);
      },
    } as ActionItem,
  ], []);

  const openRemoveModal = (data: CollectionDto) => {
    setDeleteMessage(`Do you want to delete ${data.title} collection?`);
    setDeleteModalOpen(true);
    setSelectedCollection(data);
  };

  const closeRemoveModal = () => {
    setDeleteModalOpen(false);
    setSelectedCollection(null);
  };

  const confirmCollectionRemove = async () => {
    if (selectedCollection) {
      closeRemoveModal();
      removeCollection(selectedCollection.id).then(() => {
        getCollections();
      });
    }
  };

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  if (loadingCollections || removingCollection) {
    return <Grid container spacing={3} p={2} alignItems="center" justifyContent="center">
      <CircularLoading textVariant="h6"
        text="Loading" size={80} style={{minHeight: "80vh"}}/>;
    </Grid>;
  }

  const collectionCard = collections?.map((data: CollectionDto) => {
    return <Grid item key={data.id}>
      <CollectionCard model={data} onRemove={openRemoveModal} />
    </Grid>;
  });

  return (
    <>
      <Grid minWidth={350} container pl={2} pr={2} mb={15} spacing={2}
        direction={isMobile ? "column": "row"} alignItems="center" justifyContent="center">
        {collectionCard}
      </Grid>
      <ActionsBar actionItems={actions}/>
      <CollectionFormModal
        open={collectionModalOpen}
        onClose={()=> setCollectionModalOpen(false)}
        onSuccess={() => getCollections()}
      />
      <YesNoModal onSuccess={confirmCollectionRemove} message={deleteMessage}
        open={deleteModalOpen} onClose={closeRemoveModal}/>
    </>
  );
};
