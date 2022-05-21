import {Button, Stack} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Colors from "styles/colors.module.scss";
import React from "react";

const navigationStyle = {
  minHeight: 50,
  width: "100%",
  position: "fixed",
  bottom: 0,
  backgroundColor: Colors.background,
  borderTop: "solid black 2px",
};

const actionStyle = {
  marginTop: 2,
  marginBottom: 2,
};


const actionItem =
  <Button sx={actionStyle} size="large"
    color="primary" variant="contained"><AddIcon/>Add new collection</Button>;


export const ActionsBar = () => {
  return <Stack direction="row" spacing={2} justifyContent="center" sx={navigationStyle}>
    {actionItem}
  </Stack>;
};
