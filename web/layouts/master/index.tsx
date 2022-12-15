import React, { Fragment, ReactNode } from "react";

import HeaderPartial from "@/layouts/master/partials/header";

import { Box, Toolbar } from "@mui/material";

type MasterLayoutProps = {
  children: ReactNode;
};

const MasterLayout = ({ children }: MasterLayoutProps) => {
  return (
    <Fragment>
      <HeaderPartial />
      <Box component="main">
        <Toolbar />
        <Box>{children}</Box>
      </Box>
    </Fragment>
  );
};

export default MasterLayout;
