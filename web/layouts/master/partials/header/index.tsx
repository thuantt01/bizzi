import React, { Fragment, MouseEvent } from "react";

import NextLink from "next/link";

import {
  Box,
  Menu,
  Avatar,
  AppBar,
  Toolbar,
  MenuItem,
  IconButton,
} from "@mui/material";
import { FiHome } from "@/libs/icon";
import { pagePath } from "@/libs/app/const";
import { AuthContext } from "@/contexts/auth";
import { useTranslation } from "react-i18next";

const HeaderPartial = () => {
  const { t } = useTranslation("layout", { keyPrefix: "master.header" });

  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const onMenuClick = (e: MouseEvent<HTMLElement>) => {
    return setAnchor(e.currentTarget);
  };

  const onMenuClose = () => {
    return setAnchor(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box flexGrow={1}>
          <IconButton component={NextLink} href={pagePath.home}>
            <FiHome size="2rem" color="white" />
          </IconButton>
        </Box>
        <Box display="flex">
          <AuthContext.Consumer>
            {({ user, isAuth }) => {
              if (!isAuth) {
                return null;
              }
              return (
                <Fragment>
                  <Avatar alt={user.email} onClick={onMenuClick}>
                    {user.name[0]}
                  </Avatar>
                  <Menu open={!!anchor} anchorEl={anchor} onClose={onMenuClose}>
                    <MenuItem
                      onClick={onMenuClose}
                      component={NextLink}
                      href={pagePath.account.index}
                    >
                      {t("menu.item.account")}
                    </MenuItem>
                  </Menu>
                </Fragment>
              );
            }}
          </AuthContext.Consumer>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderPartial;
