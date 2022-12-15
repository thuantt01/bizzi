import React from "react";

import PostLayout from "@/features/posts/detail";

import { client } from "@/contexts/client";
import { getIdSlug } from "@/libs/app/util";
import { GetServerSidePropsContext } from "next";
import { Post, GetPostDocument } from "@/graphql/posts/get-post.grapql";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type PostPageTypes = {
  post: Post;
};

const PostPage = ({ post }: PostPageTypes) => {
  return <PostLayout post={post} />;
};

export const getServerSideProps = async ({
  locale,
  params,
}: GetServerSidePropsContext) => {
  const { slug } = params || {};

  const { data } = await client.query({
    query: GetPostDocument,
    variables: {
      id: getIdSlug(slug as string),
    },
  });

  const { post } = data || {};
  if (!post) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["home"])),
      post: post,
    },
  };
};

export default PostPage;
