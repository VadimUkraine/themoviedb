import { gql } from "@apollo/client";

export const CREATE_LIST = gql`
  mutation CreateListMutation($userId: String!, $name: String!, $id: String!) {
    createList(userId: $userId, name: $name, id: $id) {
      name
    }
  }
`;

export const GET_USER_LISTS = gql`
  query GetUserLists($userId: String!, $skipQuantity: Boolean!) {
    userLists(userId: $userId) {
      id
      name
      quantity @skip(if: $skipQuantity)
    }
  }
`;

export const ADD_MOVIE_TO_LIST = gql`
  mutation AddMovieToListMutation(
    $userId: String!
    $movieId: String!
    $movieTitle: String!
    $posterPath: String!
    $listId: String!
  ) {
    addMovieToList(
      userId: $userId
      movieId: $movieId
      movieTitle: $movieTitle
      posterPath: $posterPath
      listId: $listId
    ) {
      movieId
      movieTitle
      posterPath
    }
  }
`;

export const DELETE_LIST = gql`
  mutation DeleteListMutation($listId: String!) {
    deleteList(listId: $listId) {
      id
      name
    }
  }
`;

export const GET_USER_MOVIES_LIST = gql`
  query GetUserMoviesList($listId: String!) {
    userMoviesList(listId: $listId) {
      movieId
      movieTitle
      posterPath
    }
  }
`;

export const REMOVE_USER_MOVIE_FROM_LIST = gql`
  mutation RemoveUserMovieMutation($listId: String!, $movieId: String!) {
    removeUserMovie(listId: $listId, movieId: $movieId) {
      movieId
    }
  }
`;
