import React, { Fragment, ReactNode } from "react";

import NextLink from "next/link";
import HeaderPartial from "@/layouts/master/partials/header";

import {
  Box,
  Grid,
  Paper,
  Toolbar,
  MenuList,
  MenuItem,
  Container,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/auth";
import { pagePath } from "@/libs/app/const";
import { useTranslation } from "next-i18next";
import { FiFeather, FiLogOut } from "@/libs/icon";

type MasterLayoutProps = {
  children: ReactNode;
  isPrivate?: boolean;
};

const Template = ({ children, isPrivate }: MasterLayoutProps) => {
  const { replace } = useRouter();
  const { useCleanAuth } = useAuth();
  const { t } = useTranslation("layout", { keyPrefix: "master" });

  const onLogOut = () => {
    if (useCleanAuth()) {
      return replace(pagePath.home);
    }
  };

  if (isPrivate) {
    return (
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper>
              <MenuList dense>
                <MenuItem
                  component={NextLink}
                  href={pagePath.account.post.list}
                >
                  <ListItemIcon>
                    <FiFeather size="1.5rem" />
                  </ListItemIcon>
                  <ListItemText>{t("sidebar.item.post")}</ListItemText>
                </MenuItem>
                <MenuItem onClick={onLogOut}>
                  <ListItemIcon>
                    <FiLogOut size="1.5rem" />
                  </ListItemIcon>
                  <ListItemText>{t("sidebar.item.log-out")}</ListItemText>
                </MenuItem>
              </MenuList>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            {children}
          </Grid>
        </Grid>
      </Container>
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
