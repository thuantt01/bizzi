import { gql } from "@apollo/client";
import { useMutation, MutationHookOptions } from "@apollo/client";

export type SignUpMutationVariables = {
  input: {
    email: string;
    name: string;
    password: string;
  };
};

export type SignUpMutation = {
  signUp: {
    token: string;
  };
};

export const SignUpDocument = gql`
  mutation SignUp($input: SignUpUserInput!) {
    signUp(signUpUserInput: $input) {
      token
    }
  }
`;

export function useSignUpMutation(
  options?: MutationHookOptions<SignUpMutation, SignUpMutationVariables>
) {
  return useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    options
  );
}
