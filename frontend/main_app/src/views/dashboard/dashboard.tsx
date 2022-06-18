import React, {useEffect, useMemo, useState} from "react";
import {Grid, useMediaQuery, useTheme} from "@mui/material";
import {CollectionCard} from "views/dashboard/components/collectionCard";
import collectionsApi, {CollectionDto} from "api/collections.api";
import {CircularLoading} from "components/loadings/circularLoading";
import useHttp from "hooks/useHttp";
import {ActionItem, ActionsBar} from "views/dashboard/components/actionsBar";
import {CollectionFormModal} from "modals/collectionFormModal";

const collectionLoadingView = (
  <Grid container spacing={3} p={2} alignItems="center" justifyContent="center">
    <CircularLoading textVariant="h6"
      text="Loading" size={80} style={{minHeight: "80vh"}}/>;
  </Grid>
);

export const DashboardView = () => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));
  const {sendRequest: getCollections, pending, data: collections} =
      useHttp(collectionsApi.getCollections, true);
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);

  const actions = useMemo(() => [
    {
      title: "Add new collection",
      onClick: () => {
        setCollectionModalOpen(true);
      },
    } as ActionItem,
  ], []);

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  if (pending) {
    return collectionLoadingView;
  }

  return (
    <>
      <Grid container pl={2} pr={2} spacing={2}
        direction={isMobile ? "column": "row"} alignItems="center" justifyContent="center">
        {collections.map((data: CollectionDto) => {
          return <Grid item key={data.id}>
            <CollectionCard model={data} />
          </Grid>;
        })}
      </Grid>
      <ActionsBar actionItems={actions}/>
      <CollectionFormModal
        open={collectionModalOpen}
        onClose={()=> setCollectionModalOpen(false)}
      />
    </>
  );
};
