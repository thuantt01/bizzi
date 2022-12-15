import React, { Fragment, ReactNode } from "react";

import HeaderPartial from "@/layouts/master/partials/header";

import {
  Box,
  Grid,
  Paper,
  Toolbar,
  MenuList,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type MasterLayoutProps = {
  children: ReactNode;
  isPrivate?: boolean;
};

const Template = ({ children, isPrivate }: MasterLayoutProps) => {
  const { t } = useTranslation("layout", { keyPrefix: "master.sidebar" });

  if (isPrivate) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper>
            <MenuList dense>
              <MenuItem>
                <ListItemText>{t("item.post")}</ListItemText>
              </MenuItem>
            </MenuList>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          {children}
        </Grid>
      </Grid>
    );
  }

  return <Box>{children}</Box>;
};

const MasterLayout = ({ children, isPrivate = false }: MasterLayoutProps) => {
  return (
    <Fragment>
      <HeaderPartial />
      <Box component="main">
        <Toolbar />
        <Template isPrivate={isPrivate}>{children}</Template>
      </Box>
    </Fragment>
  );
};

export default MasterLayout;
