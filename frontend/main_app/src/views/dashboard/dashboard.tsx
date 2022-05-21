import React, {useEffect} from "react";
import {Grid, useMediaQuery, useTheme} from "@mui/material";
import {CollectionCard} from "views/dashboard/components/collectionCard";
import collectionsApi, {CollectionDto} from "api/collections.api";
import {CircularLoading} from "components/loadings/circularLoading";
import useHttp from "hooks/useHttp";

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

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  if (pending) {
    return collectionLoadingView;
  }

  return (
    <Grid container pl={2} pr={2} spacing={2}
      direction="column" alignItems={isMobile ? "center": "left"} justifyContent="center">
      {collections.map((data: CollectionDto) => {
        return <Grid item key={data.id}>
          <CollectionCard model={data} />
        </Grid>;
      })}
    </Grid>
  );
};
