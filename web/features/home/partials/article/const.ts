import { Post } from "@/graphql/posts/get-posts.grapql";

export type Cursor = {
  page: number;
  edges: Post[];
  count: number;
};
