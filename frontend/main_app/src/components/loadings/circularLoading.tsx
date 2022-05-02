import React, {CSSProperties} from "react";
import {CircularProgress, Typography} from "@mui/material";
import styles from "components/loadings/circularLoading.module.scss";

type Props = {
  style?: CSSProperties;
  className?: string;
  size?: number;
  text?: string;
  variant?: "h1"|"h2"|"h3"|"h4"|"h5"|"h6"
}

export const CircularLoading = (props: Props) => {
  return <div style={props.style}
    className={`${props.className} ${styles.circularLoading}`}>
    <div style={{display: "block", textAlign: "center"}}>
      <CircularProgress size={props.size} color="primary"/>
      <Typography color="primary" variant={props.variant}>{props.text}</Typography>
    </div>
  </div>;
};
