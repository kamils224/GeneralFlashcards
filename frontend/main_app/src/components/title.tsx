import {Typography} from "@mui/material";
import React from "react";

const titleStyle = {
  marginTop: 2,
  textAlign: "center",
  fontWeight: "bold",
};

type Props = {
    value: string,
    subtitle?: string,
}

export const Title = (props: Props) => {
  return <Typography variant="h4" sx={titleStyle}>{props.value}</Typography>;
};
