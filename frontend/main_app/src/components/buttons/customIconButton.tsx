import React from "react";
import {Button, Tooltip} from "@mui/material";
import Colors from "styles/colors.module.scss";

type Props = {
    icon: JSX.Element,
    onClick: () => any,
    color?: "secondary"|"success"|"inherit"|"warning"|"error"|"primary"|"info",
    position?: string,
    top?: string,
    right?: string,
    hoverColor?: string,
    tooltipText?: string,
    sx?: Record<string, any>,
}


export const CustomIconButton = (props: Props) => {
  const style = {
    "position": props.position || "absolute",
    "right": props.right || "2%",
    "top": props.top || "2%",
    "&:hover": {
      "backgroundColor": props.hoverColor || Colors.backgroundInfo,
    },
    ...props.sx,
  };
  const handleClick = () => props.onClick();
  return (
    <>
      {props.tooltipText ?
          (<Tooltip arrow placement="bottom" title={props.tooltipText}>
            <Button onClick={handleClick} sx={style as any} color={props.color}>{props.icon}</Button>
          </Tooltip>) :
          <Button sx={style as any} color={props.color}>{props.icon}</Button>}
    </>
  );
};
