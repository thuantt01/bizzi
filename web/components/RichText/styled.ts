import {
  Box,
  styled,
  FormControl,
  BoxProps as UIBoxProps,
} from "@mui/material";
import { EditorContent } from "@tiptap/react";

export interface BoxProps extends UIBoxProps {
  isEmpty?: boolean;
  isError?: boolean;
  isFocused: boolean;
}

export const Root = styled(FormControl)(() => ({}));

export const Toolbar = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const ToolbarLine = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: theme.spacing(0.5),
}));

export const RichTextControl = styled(Box)(() => ({
  border: 0,
  padding: 0,
  minWidth: 0,
  maxWidth: "1024px",
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
}));

export const Label = styled(Box, {
  shouldForwardProp: (prop) =>
    !["isFocused", "isEmpty", "isError"].includes(prop as string),
})<BoxProps>(({ theme, isFocused, isEmpty, isError }) => ({
  top: 0,
  left: 0,
  zIndex: 1,
  padding: 0,
  fontsize: "1rem",
  display: "block",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  pointerEvents: "none",
  textOverflow: "ellipsis",
  transformOrigin: "top left",
  color: "rgba(0, 0, 0, 0.6)",
  transform: "translate(14px, 9px) scale(1)",
  maxWidth: `calc(100% - ${theme.spacing(3)})`,
  transition:
    "color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
  ...((isFocused || !isEmpty) && {
    userSelect: "none",
    ...(isFocused && {
      color: theme.palette.primary.main,
    }),
    maxWidth: `calc(133% - ${theme.spacing(3)})`,
    transform: "translate(14px, -9px) scale(0.75)",
  }),
  ...(isError && {
    color: `${theme.palette.error.main} !important`,
  }),
}));

export const RichTextBase = styled(Box)(({ theme }) => ({
  width: "100%",
  alignItems: "center",
  position: "relative",
  display: "inline-flex",
  boxSizing: "border-box",
  borderRadius: theme.spacing(0.5),
  padding: `${theme.spacing(1.0625)} ${theme.spacing(1.75)}`,
  "&:hover fieldset": {
    borderColor: "rgba(0, 0, 0, 0.87)",
  },
}));

export const Fieldset = styled(Box, {
  shouldForwardProp: (prop) =>
    !["isFocused", "isError"].includes(prop as string),
})<BoxProps>(({ theme, isFocused, isError }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  margin: 0,
  minWidth: "0",
  textAlign: "left",
  borderWidth: "1px",
  overflow: "hidden",
  position: "absolute",
  borderStyle: "solid",
  pointerEvents: "none",
  borderRadius: "inherit",
  padding: `0 ${theme.spacing(1)}`,
  borderColor: "rgba(0, 0, 0, 0.23)",
  ...(isFocused && {
    ...(!isError && {
      borderWidth: "2px",
    }),
    borderColor: `${theme.palette.primary.main} !important`,
  }),
  ...(isError && {
    ...(isFocused && {
      borderWidth: "2px",
    }),
    borderColor: `${theme.palette.error.main} !important`,
  }),
}));

export const Legend = styled(Box, {
  shouldForwardProp: (prop) =>
    !["isFocused", "isEmpty"].includes(prop as string),
})<BoxProps>(({ theme, isFocused, isEmpty }) => ({
  padding: 0,
  width: "auto",
  float: "unset",
  display: "block",
  textAlign: "left",
  overflow: "hidden",
  maxWidth: "0.01px",
  fontSize: "0.75rem",
  whiteSpace: "nowrap",
  pointerEvents: "none",
  height: theme.spacing(0.125),
  transition: "max-width 50ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
  ...((isFocused || !isEmpty) && {
    maxWidth: "100%",
    transition: "max-width 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
  }),
  "& > span": {
    opacity: 0,
    paddingLeft: "5px",
    fonSize: "0.75rem",
    paddingRight: "5px",
    whiteSpace: "nowrap",
    visibility: "visible",
  },
}));

export const UIEditorContent = styled(EditorContent)(({ theme }) => ({
  margin: 0,
  border: 0,
  minWidth: 0,
  width: "100%",
  height: theme.spacing(40),
}));
