import React from "react";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";

export const NavigationBar = () => {
  const titleStyle = {textShadow: "1px 1px black"};

  return <AppBar sx={{boxShadow: 3}}>
    <Toolbar>
      <Box sx={{flexGrow: 1}}>
        <Typography color="secondary" variant="h4" component="div"
          sx={{fontWeight: "bold"}}>
          <span style={titleStyle}>Flashcards</span>
        </Typography>
        <Typography sx={{fontWeight: "bold"}} color="secondary" variant="h5" component="div">
          <span style={titleStyle}>for general purpose</span>
        </Typography>
      </Box>
      <Button size="large" color="secondary"
        variant="contained">Log out</Button>
    </Toolbar>
  </AppBar>;
};
