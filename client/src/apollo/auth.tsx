import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation RegisterMutation($name: String!, $password: String!, $id: String!) {
    register(password: $password, name: $name, id: $id) {
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
      id
    }
  }
`;
