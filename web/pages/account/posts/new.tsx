import React, { Fragment } from "react";

import withAuthServerSideProps from "@/libs/auth";
import AccountPostNewLayout from "@/features/account/posts/new";

import { MetaTag } from "@/components";
import { Layout } from "@/libs/app/const";
import { useTranslation } from "next-i18next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const AccountPostNewPage = () => {
  const { t } = useTranslation("account", { keyPrefix: "post.new" });

  return (
    <Fragment>
      <MetaTag title={t("title")} description={t("description") as string} />
      <AccountPostNewLayout />
    </Fragment>
  );
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
