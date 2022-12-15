import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";

const HeaderPartial = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box flexGrow={1} />
        <Box display="flex"></Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderPartial;
