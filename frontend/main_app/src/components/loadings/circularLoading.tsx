import React, {CSSProperties} from "react";
import {CircularProgress, Typography} from "@mui/material";
import styles from "components/loadings/circularLoading.module.scss";

type Props = {
  style?: CSSProperties;
  className?: string;
  size?: number;
  text?: string;
  textVariant?: "h1"|"h2"|"h3"|"h4"|"h5"|"h6"
  color?: "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | undefined;
  inlineText?: boolean;
}

export const CircularLoading = (props: Props) => {
  return <div style={props.style}
    className={`${props.className} ${styles.circularLoading}`}>
    <div style={{textAlign: "center"}}>
      <CircularProgress size={props.size} color={props.color || "primary"}/>
      {!props.inlineText &&
          <Typography color={props.color || "primary"} variant={props.textVariant}>{props.text}</Typography>}
    </div>
    {props.inlineText &&
        <Typography ml={1} color={props.color || "primary"} variant={props.textVariant}>{props.text}</Typography>}
  </div>;
};
