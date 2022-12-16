import { gql } from "@apollo/client";
import { useMutation, MutationHookOptions } from "@apollo/client";

export type UpdatePostMutationVariables = {
  input: {
    id: number;
    title: string;
    content: string;
  };
};

export type UpdatePostMutation = {
  updatePost: {
    id: number;
    title: string;
    content: string;
  };
};

export const UpdatePostDocument = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(updatePostInput: $input) {
      id
      title
      content
    }
  }
`;

export function useUpdatePostMutation(
  options?: MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>
) {
  return useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument,
    options
  );
}
