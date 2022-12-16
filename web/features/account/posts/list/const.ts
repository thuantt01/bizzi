import { UserPost } from "@/graphql/account/posts/get-user-posts.graphql";

export type Cursor = {
  page: number;
  count: number;
  edges: UserPost[];
};
