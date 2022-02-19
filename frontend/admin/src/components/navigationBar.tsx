import React from "react";
import {AppBar} from "@mui/material";

type Props ={
  children?: JSX.Element
}

export const NavigationBar = ({children}: Props) => {
  return <AppBar>{children}</AppBar>;
};
