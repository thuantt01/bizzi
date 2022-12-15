import { gql } from "@apollo/client";
import {
  useQuery,
  useLazyQuery,
  QueryHookOptions,
  LazyQueryHookOptions,
} from "@apollo/client";

export type GetPostsQueryVariables = {
  input: {};
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
  query Posts {
    posts {
      id
      slug
      title
      createdAt
      user {
        id
        name
      }
    }
  }
`;

export function useGetDetailSupportRequestQuery(
  baseOptions: QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>
) {
  return useQuery<GetPostsQuery, GetPostsQueryVariables>(
    GetPostsDocument,
    baseOptions
  );
}

export function useGetDetailSupportRequestLazyQuery(
  baseOptions?: LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>
) {
  return useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(
    GetPostsDocument,
    baseOptions
  );
}
