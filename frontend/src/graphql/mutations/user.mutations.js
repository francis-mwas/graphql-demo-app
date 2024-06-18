import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Registeruser($input: SignUpInput!) {
    registerUser(input: $input) {
      _id
      name
      username
    }
  }
`;
export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      _id
      name
      username
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logout {
      message
    }
  }
`;
