import React, { ReactNode } from "react";
import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { Toaster } from "@/libs/toast";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9155fd",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
});

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <Toaster position="top-right" />
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
