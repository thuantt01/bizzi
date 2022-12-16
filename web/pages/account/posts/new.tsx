import React from "react";

import withAuthServerSideProps from "@/libs/auth";
import AccountPostNewLayout from "@/features/account/posts/new";

import { Layout } from "@/libs/app/const";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const AccountPostNewPage = () => {
  return <AccountPostNewLayout />;
};

export const getServerSideProps = withAuthServerSideProps(
  async ({ locale }: GetServerSidePropsContext) => {
    return {
      props: {
        ...(await serverSideTranslations(locale as string, [
          "account",
          "layout",
        ])),
        pageLayout: Layout.Private,
      },
    };
  },
  { isPublic: false }
);

export default AccountPostNewPage;
