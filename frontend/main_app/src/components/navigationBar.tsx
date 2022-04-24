import React, {Fragment} from "react";
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";

export const NavigationBar: React.FC<React.ReactNode> = (props ) => {
  const titleStyle = {textShadow: "1px 1px black"};

  return <Fragment>
    <AppBar position="sticky" sx={{boxShadow: 3}}>
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
    </AppBar>
    <Container disableGutters maxWidth={false}>
      {props.children}
    </Container>
  </Fragment>;
};
