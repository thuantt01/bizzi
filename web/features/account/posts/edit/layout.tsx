import React from "react";

import PostForm from "@/features/account/posts/_components/form";

import { UserPost } from "@/graphql/account/posts/get-user-post.graphql";

type AccountPostEditLayoutProps = {
  post: UserPost;
};

const AccountPostEditLayout = ({ post }: AccountPostEditLayoutProps) => {
  return <PostForm post={post} />;
};

export default AccountPostEditLayout;
