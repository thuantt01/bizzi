import { gql } from "@apollo/client";
import { useQuery, QueryHookOptions } from "@apollo/client";

export type GetUserPostsQueryVariables = {
  page: number;
};

export type UserPost = {
  id: number;
  slug: string;
  title: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
};

export type GetUserPostsQuery = {
  __typename?: "Query";
  userPosts?: Array<UserPost> | null;
  totalPage: number;
};

export const GetUserPostsDocument = gql`
  query UserPosts($page: Int!) {
    userPosts(page: $page) {
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

export function useGetUserPostsQuery(
  baseOptions: QueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables>
) {
  return useQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(
    GetUserPostsDocument,
    baseOptions
  );
}
