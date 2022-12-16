import React from "react";

import { LoadingButton } from "@mui/lab";
import { AuthContext } from "@/contexts/auth";
import { useTranslation } from "next-i18next";
import { ModalType } from "@/features/home/shared";
import { Box, Typography, Stack } from "@mui/material";

type HeroPartialProps = {
  isBtnLoading: boolean;
  onModalChange: (val: ModalType) => void;
};

const HeroPartial = ({ isBtnLoading, onModalChange }: HeroPartialProps) => {
  const { t } = useTranslation("home", { keyPrefix: "partial.hero" });

  const onSignUpClick = () => {
    return onModalChange(ModalType.SignUp);
  };

  const onSignInClick = () => {
    return onModalChange(ModalType.SignIn);
  };

  return (
    <Box>
      <Typography component="h1" variant="h2" align="center" gutterBottom>
        {t("title")}
      </Typography>
      <Typography paragraph variant="h5" align="center" color="text.secondary">
        {t("description")}
      </Typography>

      <AuthContext.Consumer>
        {({ isAuth }) => {
          if (isAuth) {
            return null;
          }

          return (
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <LoadingButton
                variant="contained"
                loading={isBtnLoading}
                onClick={onSignUpClick}
              >
                {t("btn.sign-up")}
              </LoadingButton>
              <LoadingButton
                variant="outlined"
                loading={isBtnLoading}
                onClick={onSignInClick}
              >
                {t("btn.sign-in")}
              </LoadingButton>
            </Stack>
          );
        }}
      </AuthContext.Consumer>
    </Box>
  );
};

export default HeroPartial;
