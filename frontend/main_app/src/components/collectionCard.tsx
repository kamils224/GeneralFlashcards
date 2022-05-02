import React, {useState} from "react";
import {Divider, Button, Typography, Stack, Paper} from "@mui/material";
import Colors from "styles/colors.module.scss";
import {InfoButton} from "components/buttons/infoButton";

const boxStyle = {
  height: 400,
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
  height: "25%",
  overflowWrap: "break-word",
  overflow: "auto",
  textOverflow: "ellipsis",
};
const mainContentStyle = {
  height: "40%",
  maxHeight: "40%",
};
const textStyle = {
  textAlign: "center",
  m: 2,
  overflowWrap: "break-word",
};

type Props = {
    title: string,
    description: string
}

export const CollectionCard = (props: Props) => {
  const [showDescription, setShowDescription] = useState(false);
  const switchContent = () => {
    setShowDescription(!showDescription);
  };

  const mainContent = (
    <Stack alignItems="center" sx={mainContentStyle}>
      {showDescription ?
          <>
            <InfoButton variant="text" color="info" onClick={switchContent}>Show progress</InfoButton>
            <Typography variant="h6" sx={textStyle}>Description</Typography>
          </> :
          <>
            <InfoButton variant="text" color="info" onClick={switchContent}>Show description</InfoButton>
            <Typography variant="h6" sx={textStyle}>Progress: 0/0</Typography>
          </>}
    </Stack>
  );

  return (
    <Paper sx={boxStyle}>
      <Typography variant="h4" sx={titleStyle}>
        {props.title}
      </Typography>
      <Divider/>
      {mainContent}
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
