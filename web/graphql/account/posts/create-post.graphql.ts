import { gql } from "@apollo/client";
import { useMutation, MutationHookOptions } from "@apollo/client";

export type CreatePostMutationVariables = {
  input: {
    title: string;
    content: string;
  };
};

export type CreatePostMutation = {
  createPost: {
    id: number;
    title: string;
    content: string;
  };
};

export const CreatePostDocument = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      id
      title
      content
    }
  }
`;

export function useCreatePostMutation(
  options?: MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>
) {
  return useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options
  );
}
