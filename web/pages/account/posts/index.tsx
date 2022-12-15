import React from "react";

import MasterLayout from "@/layouts/master";
import withAuthServerSideProps from "@/libs/auth";

import { Layout } from "@/libs/app/const";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const AccountPostsPage = () => {
  return <MasterLayout isPrivate={true}>1</MasterLayout>;
};

export const getServerSideProps = withAuthServerSideProps(
  async ({ locale }: GetServerSidePropsContext) => {
    return {
      props: {
        ...(await serverSideTranslations(locale as string, ["layout"])),
        pageLayout: Layout.Private,
      },
    };
  },
  { isPublic: false }
);

export default AccountPostsPage;
