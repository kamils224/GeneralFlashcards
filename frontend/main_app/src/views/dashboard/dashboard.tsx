import React from "react";
import {Grid} from "@mui/material";
import {CollectionCard} from "components/collectionCard";


export const DashboardView = () => {
  return (
    <Grid container spacing={3} p={2}>
      <Grid item>
        <CollectionCard title="Title" description="Progress: 0/0"/>
      </Grid>
      <Grid item>
        <CollectionCard title="TitleTitleTitleTitle TitleTitleTitleTitle"
          description="Progress: 0/0"/>
      </Grid>
    </Grid>
  );
};
