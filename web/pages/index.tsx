import React, { Fragment } from "react";

import HomeLayout from "@/features/home/layout";
import withAuthServerSideProps from "@/libs/auth";

import { MetaTag } from "@/components";
import { client } from "@/contexts/client";
import { useTranslation } from "next-i18next";
import { GetServerSidePropsContext } from "next";
import { Post, GetPostsDocument } from "@/graphql/posts/get-posts.graphql";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type HomePageProps = {
  count: number;
  posts: Post[];
};

const HomePage = ({ posts, count }: HomePageProps) => {
  const { t } = useTranslation("home");

  return (
    <Fragment>
      <MetaTag title={t("title")} />
      <HomeLayout posts={posts} count={count} />
    </Fragment>
  );
};

export const getServerSideProps = withAuthServerSideProps(
  async ({ locale }: GetServerSidePropsContext) => {
    const { data } = await client.query({
      query: GetPostsDocument,
      variables: {
        page: 1,
      },
    });

    const { totalPage, posts: postsData } = data || {};

    const count = +totalPage || 0;
    const posts = Array.isArray(postsData) ? postsData : [];

    return {
      props: {
        ...(await serverSideTranslations(locale as string, ["home", "layout"])),
        count,
        posts: posts,
      },
    };
  }
);

export default HomePage;
