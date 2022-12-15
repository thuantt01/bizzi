import { gql } from "@apollo/client";
import { useMutation, MutationHookOptions } from "@apollo/client";

export type SignInMutationVariables = {
  input: {
    email: string;
    password: string;
  };
};

export type SignInMutation = {
  signIn: {
    user: {
      name: string;
      email: string;
    };
    token: string;
  };
};

export const SignInDocument = gql`
  mutation SignIn($input: SignInUserInput!) {
    signIn(SignInUserInput: $input) {
      user {
        name
        email
      }
      token
    }
  }
`;

export function useSignInMutation(
  options?: MutationHookOptions<SignInMutation, SignInMutationVariables>
) {
  return useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options
  );
}
