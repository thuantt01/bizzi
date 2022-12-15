import React from "react";
import { TextField as UITextField, TextFieldProps } from "@mui/material";

export type { TextFieldProps };

export const TextField = ({ size = "small", ...props }: TextFieldProps) => {
  return <UITextField size={size} {...props} />;
};
