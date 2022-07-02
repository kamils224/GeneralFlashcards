import React from "react";
import {Button, Stack} from "@mui/material";
import Colors from "styles/colors.module.scss";

const navigationStyle = {
  minHeight: 50,
  width: "100%",
  position: "fixed",
  bottom: 0,
  backgroundColor: Colors.primary,
};

const actionStyle = {
  marginTop: 2,
  marginBottom: 2,
};

export type ActionItem = {
  title: string,
  onClick: () => any,
}

type Props = {
  actionItems: Array<ActionItem>
}

const createActionItem = (actionItem: ActionItem): JSX.Element => {
  return <Button key={actionItem.title} sx={actionStyle} size="large"
    color="secondary" variant="contained" onClick={actionItem.onClick}>
    {actionItem.title}
  </Button>;
};

export const ActionsBar = (props: Props) => {
  return <Stack direction="row" spacing={2} justifyContent="center" sx={navigationStyle}>
    { props.actionItems.map((item: ActionItem) => createActionItem(item)) }
  </Stack>;
};
