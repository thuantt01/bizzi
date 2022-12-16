import React from "react";

import withAuthServerSideProps from "@/libs/auth";
import AccountPostsLayout from "@/features/account/posts/list";

import { Layout } from "@/libs/app/const";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const AccountPostsPage = () => {
  return <AccountPostsLayout />;
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

export default AccountPostsPage;
