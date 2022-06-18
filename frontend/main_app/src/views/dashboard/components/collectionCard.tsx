import React, {useState} from "react";
import {Divider, Button, Typography, Stack, Paper} from "@mui/material";
import Colors from "styles/colors.module.scss";
import {InfoButton} from "components/buttons/infoButton";
import {CollectionDto} from "api/collections.api";
import DeleteIcon from "@mui/icons-material/Delete";
import {CustomIconButton} from "components/buttons/customIconButton";

const boxStyle = {
  "position": "relative",
  "height": 300,
  "width": 350,
  "backgroundColor": Colors.backgroundSecondary,
  "boxShadow": 5,
  "borderRadius": 5,
};
const titleStyle = {
  "fontWeight": "bold",
  "textAlign": "center",
  "alignSelf": "center",
  "justifySelf": "center",
  "p": 1,
  "height": "25%",
  "overflowWrap": "break-word",
  "overflow": "auto",
  "textOverflow": "ellipsis",
  "wordBreak": "break-word",
  "marginLeft": 2,
  "marginRight": 2,
};
const mainContentStyle = {
  height: "40%",
};
const textStyle = {
  textAlign: "center",
  marginRight: "5%",
  marginLeft: "5%",
  overflowWrap: "break-word",
  overflow: "auto",
  textOverflow: "ellipsis",
  wordBreak: "break-word",
  fontSize: ".9rem",
};
const dateStyle = {
  color: Colors.info,
  textAlign: "center",
  fontSize: ".8rem",
  fontStyle: "italic",
};

type Props = {
    model: CollectionDto,
}

export const CollectionCard = ({model}: Props) => {
  const [showDescription, setShowDescription] = useState(false);
  const switchContent = () => {
    setShowDescription(!showDescription);
  };

  const mainContent = (
    <Stack spacing={0} alignItems="center" sx={mainContentStyle}>
      {showDescription ?
          <>
            <InfoButton size="small" variant="text" color="info" onClick={switchContent}>Show info</InfoButton>
            <Typography variant="h6" sx={textStyle}>{model.description}</Typography>
          </> :
          <>
            <InfoButton size="small" variant="text" color="info" onClick={switchContent}>Show description</InfoButton>
            <Typography variant="h6" sx={textStyle}>Items: {model.flashcardsCount}</Typography>
          </>}
    </Stack>
  );

  const actionsGroup = (
    <Stack m={0} p={2} spacing={2} direction="row" justifyContent="center" alignItems="flex-end">
      <Button size="small" variant="contained" color="primary">
            Start learning
      </Button>
      <Button size="small" variant="contained" color="secondary">
            Edit collection
      </Button>
    </Stack>
  );

  const handleRemoveCollection = () => {
    console.log("Remove collection");
  };

  return (
    <Paper sx={boxStyle}>
      <CustomIconButton onClick={handleRemoveCollection}
        icon={<DeleteIcon/>} color="info" tooltipText={"Delete collection"}/>
      <Typography variant="h6" sx={titleStyle}>
        {model.title}
      </Typography>
      <Divider/>
      {mainContent}
      <Divider/>
      <Typography variant="h6" sx={dateStyle}>
                Created:&nbsp; {model.dateCreated.toLocaleDateString()}
      </Typography>
      {actionsGroup}
    </Paper>
  );
};
