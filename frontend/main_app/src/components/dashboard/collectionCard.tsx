import React from "react";
import {Divider, Button, Typography, Stack, Paper} from "@mui/material";
import Colors from "styles/colors.module.scss";
import {CollectionDto} from "api/collections.api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {IconButton} from "components/buttons/iconButton";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "routes/routeNames";

const boxStyle = {
  "position": "relative",
  "height": 300,
  "width": 350,
  "backgroundColor": Colors.backgroundSecondary,
  "boxShadow": 5,
  "borderRadius": 5,
  ["@media (max-width:900px)"]: {
    width: "550px",
  },
  ["@media (max-width:600px)"]: {
    width: "400px",
  },
  ["@media (max-width:450px)"]: {
    maxWidth: "350px",
  },
};
const titleStyle = {
  "fontWeight": "bold",
  "textAlign": "center",
  "alignSelf": "center",
  "justifySelf": "center",
  "height": "25%",
  "overflowWrap": "break-word",
  "marginLeft": 2,
  "marginRight": 2,
};

const statsStyle = {
  textAlign: "center",
  marginRight: "5%",
  marginLeft: "5%",
  overflowWrap: "break-word",
  wordWrap: "break-word",
  p: 2,
};

const dateStyle = {
  color: Colors.info,
  textAlign: "center",
  fontSize: ".8rem",
  fontStyle: "italic",
};

type Props = {
    model: CollectionDto,
    onRemove: (model: CollectionDto) => void,
}

export const CollectionCard = ({model, onRemove}: Props) => {
  const navigate = useNavigate();

  const toCollectionView = () => {
    navigate(RouteNames.collection.replace(":id", `${model.id}`));
  };

  const statsContent = (
    <Divider>
      <Typography variant="h6" sx={statsStyle}>Items: {model.flashcardsCount}</Typography>
    </Divider>
  );
  const actionsGroup = (
    <Stack m={0} p={2} spacing={2} direction="row" justifyContent="center" alignItems="flex-end">
      <Button disabled={model.flashcardsCount == 0} variant="contained" color="primary">
            Start learning
      </Button>
      <Button onClick={toCollectionView} variant="contained" color="secondary">
            Edit collection
      </Button>
    </Stack>
  );

  const handleRemove = () => {
    onRemove(model);
  };

  return (
    <Paper sx={boxStyle as any}>
      <Stack direction="row" justifyContent="space-between">
        <IconButton onClick={() => {
          console.log("edit");
        }} icon={<EditIcon/>} color="info"
        tooltipText={"Edit collection name"} buttonStyle={{marginLeft: 1, marginTop: 1}}/>
        <IconButton onClick={handleRemove}
          icon={<DeleteIcon/>} color="info" tooltipText={"Delete collection"}
          buttonStyle={{marginRight: 1, marginTop: 1}}/>
      </Stack>
      <Typography variant="h6" sx={titleStyle}>
        {model.title}
      </Typography>
      {statsContent}
      <Typography variant="h6" sx={dateStyle}>
                Created:&nbsp; {model.dateCreated.toLocaleDateString()}
      </Typography>
      {actionsGroup}
    </Paper>
  );
};
