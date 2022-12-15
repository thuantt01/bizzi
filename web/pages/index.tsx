import React from "react";

import HomeLayout from "@/features/home/layout";

import { client } from "@/contexts/client";
import { GetServerSidePropsContext } from "next";
import { Post, GetPostsDocument } from "@/graphql/posts/get-posts.grapql";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type HomePageProps = {
  posts: Post[];
};

const HomePage = ({ posts }: HomePageProps) => {
  return <HomeLayout posts={posts} />;
};

export const getServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  const { data } = await client.query({
    query: GetPostsDocument,
  });

  const posts = Array.isArray(data?.posts) ? data.posts : [];

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["home"])),
      posts: posts,
    },
  };
};

export default HomePage;
