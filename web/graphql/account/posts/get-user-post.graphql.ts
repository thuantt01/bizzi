import { gql } from "@apollo/client";

export type GetUserPostQueryVariables = {
  page: number;
};

export type UserPost = {
  id: number;
  title: string;
  content: string;
};

export type GetUserPostQuery = {
  __typename?: "Query";
  userPosts?: UserPost | null;
};

export const GetUserPostDocument = gql`
  query UserPost($id: Int!) {
    userPost(id: $id) {
      id
      title
      content
    }
  }
`;
