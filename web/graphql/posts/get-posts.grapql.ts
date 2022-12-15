import { gql } from "@apollo/client";
import {
  useQuery,
  useLazyQuery,
  QueryHookOptions,
  LazyQueryHookOptions,
} from "@apollo/client";

export type GetPostsQueryVariables = {
  page: number;
};

export type Post = {
  id: number;
  slug: string;
  title: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
};

export type GetPostsQuery = {
  __typename?: "Query";
  posts?: Array<Post> | null;
};

export const GetPostsDocument = gql`
  query Posts($page: Int!) {
    posts(page: $page) {
      id
      slug
      title
      createdAt
      user {
        id
        name
      }
    }
    totalPage
  }
`;

export function useGetPostsQuery(
  baseOptions: QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>
) {
  return useQuery<GetPostsQuery, GetPostsQueryVariables>(
    GetPostsDocument,
    baseOptions
  );
}
