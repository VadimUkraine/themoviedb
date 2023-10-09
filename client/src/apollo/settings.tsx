import { gql } from "@apollo/client";

export const GET_LANGUAGE = gql`
  query GetLanguage {
    language {
      lang
    }
  }
`;

export const CHANGE_LANGUAGE = gql`
  mutation ChangeLanguage($lang: String!) {
    changeLanguage(lang: $lang) {
      lang
    }
  }
`;
