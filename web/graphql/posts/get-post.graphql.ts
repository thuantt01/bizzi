import { gql } from "@apollo/client";

export type Post = {
  id: number;
  slug: string;
  title: string;
  content: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
};

export const GetPostDocument = gql`
  query Post($id: Int!) {
    post(id: $id) {
      id
      slug
      title
      content
      createdAt
      user {
        id
        name
      }
    }
  }
`;
