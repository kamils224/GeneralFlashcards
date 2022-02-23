import React, {CSSProperties} from "react";
import {CircularProgress} from "@mui/material";
import styles from "./circularLoading.module.scss";

type Props = {
  style?: CSSProperties;
  className?: string;
}

export const CircularLoading = (props: Props) => {
  return <div style={props.style}
    className={`${props.className} ${styles.circularLoading}`}>
    <CircularProgress/>
  </div>;
};
