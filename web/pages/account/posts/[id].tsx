import React, { Fragment } from "react";

import withAuthServerSideProps from "@/libs/auth";
import AccountPostEditLayout from "@/features/account/posts/edit";

import { MetaTag } from "@/components";
import { toInt } from "@/libs/app/util";
import { Layout } from "@/libs/app/const";
import { GetServerSidePropsContext } from "next";
import {
  UserPost,
  GetUserPostDocument,
} from "@/graphql/account/posts/get-user-post.graphql";
import { clientServerScoped } from "@/contexts/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type AccountPostEditPageProps = {
  post: UserPost;
};

const AccountPostEditPage = ({ post }: AccountPostEditPageProps) => {
  const { title } = post;
  return (
    <Fragment>
      <MetaTag title={title} description={title} />
      <AccountPostEditLayout post={post} />
    </Fragment>
  );
};

export const getServerSideProps = withAuthServerSideProps(
  async (ctx: GetServerSidePropsContext) => {
    const { locale, params } = ctx;
    const { id } = params || {};

    const client = clientServerScoped(ctx);

    try {
      const { data } = await client.query({
        variables: { id: toInt(id) },
        query: GetUserPostDocument,
      });

      const { userPost } = data || {};
      if (!userPost) {
        return {
          redirect: {
            destination: "/",
          },
        };
      }
      const { __typename, ...post } = userPost;
      return {
        props: {
          ...(await serverSideTranslations(locale as string, [
            "account",
            "layout",
          ])),
          post,
          pageLayout: Layout.Private,
        },
      };
    } catch (e) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
  },
  { isPublic: false }
);

export default AccountPostEditPage;
