import { Post } from "@/graphql/posts/get-posts.graphql";

export type Cursor = {
  page: number;
  edges: Post[];
  count: number;
};
