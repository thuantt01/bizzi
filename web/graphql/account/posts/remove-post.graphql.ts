import { gql } from "@apollo/client";
import { useMutation, MutationHookOptions } from "@apollo/client";

export type RemovePostMutationVariables = {
  id: number;
};

export type RemovePostMutation = {
  removePost: {
    id: number;
  };
};

export const RemovePostDocument = gql`
  mutation RemovePost($id: Int!) {
    removePost(id: $id)
  }
`;

export function useRemovePostMutation(
  options?: MutationHookOptions<RemovePostMutation, RemovePostMutationVariables>
) {
  return useMutation<RemovePostMutation, RemovePostMutationVariables>(
    RemovePostDocument,
    options
  );
}
