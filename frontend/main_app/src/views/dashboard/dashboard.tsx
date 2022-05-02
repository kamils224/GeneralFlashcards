import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import {CollectionCard} from "components/collectionCard";
import flashcardsApi from "services/flashcards.api";
import {CircularLoading} from "components/loadings/circularLoading";


export const DashboardView = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    flashcardsApi.getCollections().then((r) => console.log(r));
  }, []);

  const loadingCircle = <CircularLoading variant="h6" text="Loading" size={80} style={{minHeight: "80vh"}}/>;
  const mainContent = (
    <><Grid item>
      <CollectionCard title="Title" description="Progress: 0/0"/>
    </Grid><Grid item>
      <CollectionCard title="TitleTitleTitleTitle TitleTitleTitleTitle"
        description="Progress: 0/0"/>
    </Grid></>
  );

  return (
    <Grid container spacing={3} p={2} alignItems="center" justifyContent="center">
      {loading ? loadingCircle : mainContent}
    </Grid>
  );
};
