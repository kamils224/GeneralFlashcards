import React from "react";
import {Divider, Button, Typography, Stack, Paper} from "@mui/material";
import Colors from "styles/colors.module.scss";

const boxStyle = {
  height: 300,
  width: 350,
  backgroundColor: Colors.backgroundSecondary,
  boxShadow: 5,
  borderRadius: 5,
};
const titleStyle = {
  textAlign: "center",
  alignSelf: "center",
  justifySelf: "center",
  p: 2,
  height: "33%",
  overflowWrap: "break-word",
  overflow: "auto",
  textOverflow: "ellipsis",
};
const textStyle = {
  textAlign: "center",
  m: 2,
  overflowWrap: "break-word",
};

export const CollectionCard = (props: any) => {
  return (
    <Paper sx={boxStyle}>
      <Typography variant="h4" sx={titleStyle}>{props.title}</Typography>
      <Divider/>
      <Typography variant="h6" sx={textStyle}>{props.description}</Typography>
      <Divider/>
      <Stack m={2} p={2} spacing={2} direction="row" justifyContent="center" alignItems="flex-end">
        <Button variant="contained" color="primary">
            Start learning
        </Button>
        <Button variant="contained" color="secondary">
            Show collection
        </Button>
      </Stack>
    </Paper>
  );
};
