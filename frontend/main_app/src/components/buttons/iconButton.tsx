import React from "react";
import {Button, Tooltip} from "@mui/material";
import Colors from "styles/colors.module.scss";

type Props = {
    icon: JSX.Element,
    onClick: () => any,
    color?: "secondary"|"success"|"inherit"|"warning"|"error"|"primary"|"info",
    hoverColor?: string,
    tooltipText?: string,
    buttonStyle?: Record<string, any>,
    wrapperStyle?: Record<string, any>,
    justifyContent?: string
}

export const IconButton = (props: Props) => {
  const wrapperStyle = {
    display: "flex",
    justifyContent: props.justifyContent || "end",
    ...props.wrapperStyle,
  };

  const style = {
    "&:hover": {
      "backgroundColor": props.hoverColor || Colors.backgroundInfo,
    },
    ...props.buttonStyle,
  };
  const handleClick = () => props.onClick();
  return (
    <>
      <div style={wrapperStyle}>
        {props.tooltipText ?
          (<Tooltip arrow placement="bottom" title={props.tooltipText}>
            <Button onClick={handleClick} sx={style as any} color={props.color}>{props.icon}</Button>
          </Tooltip>) :
          <Button sx={style as any} color={props.color}>{props.icon}</Button>}
      </div>
    </>
  );
};
