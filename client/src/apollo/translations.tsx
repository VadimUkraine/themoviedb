import { gql } from "@apollo/client";

export const GET_HEADER_TRANSLATIONS = gql`
  query GetHeaderTranslations {
    headerTranslations {
      dashboardLink
      moviesLink
      randomMovieLink
      btnLogin
      defaultLang
      ruLang
      btnReloadPage
      btnClose
      errorMessage
      singIn
      signOut
      name
      password
      loginToAccount
      register
      userNameHelperText
      userPasswordHelperText
      registerTextSuccess
      registerTextError
      loginTextError
      lists
    }
  }
`;

export const GET_DASHBOARD_TRANSLATIONS = gql`
  query GetDashboardTranslations {
    dashboardTranslations {
      nowPlaying
      upcoming
      popular
      btnDetails
      errorMessage
      noData
    }
  }
`;

export const GET_MOVIES_TRANSLATIONS = gql`
  query GetMoviesTranslations {
    moviesTranslations {
      btnDetails
      noImage
      btnApply
      filtersReleaseDates
      filtersGenres
      filterFrom
      filtersTo
      errorMessage
      noData
      genresErrorMessage
    }
  }
`;

export const GET_RANDOM_MOVIE_TRANSLATIONS = gql`
  query GetRandomMovieTranslations {
    randomMovieTranslations {
      btnDetails
      noImage
      btnApply
      filtersReleaseDates
      filtersGenres
      filterFrom
      filtersTo
      errorMessage
      noData
      genresErrorMessage
    }
  }
`;

export const GET_MOVIE_DETAILS_TRANSLATIONS = gql`
  query GetMovieDetailsTranslations {
    movieDetailsTranslations {
      overview
      crew
      recommendations
      hour
      minute
      noImage
      errorMessage
    }
  }
`;

export const GET_CREATE_LISTS_TRANSLATIONS = gql`
  query GetCreateListsTranslations {
    createListsTranslations {
      errorListExist
      listCreated
      createNewList
      nameOfNewList
      create
      addToOneOfYourLists
      errorMovieExist
      movieWasAdded
    }
  }
`;

export const GET_USER_LISTS_TRANSLATIONS = gql`
  query GetUserListsTranslations {
    userListsTranslations {
      errorListExist
      listCreated
      nameOfNewList
      create
      createList
      errorMessage
      noData
      myLists
      delete
      item
      items
    }
  }
`;

export const GET_USER_MOVIES_LIST_TRANSLATIONS = gql`
  query GetUserListsTranslations {
    userMoviesListTranslations {
      errorMessage
      noData
      delete
      noImage
    }
  }
`;

export const GET_NOT_FOUND = gql`
  query GetNotFoundTranslations {
    notFoundTranslations {
      notFound
    }
  }
`;
