import React, {CSSProperties} from "react";
import {CircularProgress} from "@mui/material";
import "./circularLoading.scss";

type Props = {
  style?: CSSProperties;
  className?: string;
}

export const CircularLoading = (props: Props) => {
  return <div style={props.style}
    className={`${props.className} circular-loading`}>
    <CircularProgress/>
  </div>;
};
