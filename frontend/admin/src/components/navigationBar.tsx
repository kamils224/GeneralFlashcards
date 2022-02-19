import React from "react";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";

export const NavigationBar = () => {
  return <AppBar>
    <Toolbar>
      <Typography variant="h4" component="div" sx={{flexGrow: 2}}>
            Flashcards Dashboard
      </Typography>
      <Button size="large" color="secondary"
        variant="contained">Log out</Button>
    </Toolbar>
  </AppBar>;
};
