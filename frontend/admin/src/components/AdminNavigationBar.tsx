import React from "react";
import {AppBar} from "@mui/material";

type Props ={
  children?: JSX.Element
}

export const AdminNavigationBar = ({children}: Props) => {
  return <AppBar>{children}</AppBar>;
};
