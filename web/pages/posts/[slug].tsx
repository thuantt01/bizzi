import React, { Fragment } from "react";

import PostLayout from "@/features/posts/detail";
import withAuthServerSideProps from "@/libs/auth";

import { MetaTag } from "@/components";
import { client } from "@/contexts/client";
import { getIdSlug } from "@/libs/app/util";
import { GetServerSidePropsContext } from "next";
import { Post, GetPostDocument } from "@/graphql/posts/get-post.graphql";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type PostPageTypes = {
  post: Post;
};

const PostPage = ({ post }: PostPageTypes) => {
  const { title } = post;

  return (
    <Fragment>
      <MetaTag title={title} description={title} />
      <PostLayout post={post} />
    </Fragment>
  );
};

export const getServerSideProps = withAuthServerSideProps(
  async ({ locale, params }: GetServerSidePropsContext) => {
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
        ...(await serverSideTranslations(locale as string, ["home", "layout"])),
        post: post,
      },
    };
  }
);

export default PostPage;
