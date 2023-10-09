import { gql } from "@apollo/client";

export const MOVIE_FRAGMENT = gql`
  fragment MovieFragment on Movie {
    id
    title
    poster_path
    release_date
  }
`;

export const GET_MOVIES_LISTS = gql`
  ${MOVIE_FRAGMENT}
  query getMoviesLists {
    moviesLists {
      playing {
        ...MovieFragment
      }
      upcoming {
        ...MovieFragment
      }
      popular {
        ...MovieFragment
      }
    }
  }
`;

export const GET_MOVIE_DETAILS = gql`
  query getMovie($id: ID!) {
    movieById(id: $id) {
      details {
        id
        title
        poster_path
        overview
        release_date
        tagline
        backdrop_path
        genres
        runtime
      }
      crew {
        id
        name
        known_for_department
        profile_path
        job
      }
      recommendations {
        id
        title
        poster_path
        vote_average
      }
    }
  }
`;

export const GET_FILTERED_MOVIES = gql`
  ${MOVIE_FRAGMENT}
  query getFilteredMovies(
    $page: Int
    $with_genres: String
    $dateFrom: String
    $dateTo: String
  ) {
    filteredMoviesList(
      page: $page
      with_genres: $with_genres
      dateFrom: $dateFrom
      dateTo: $dateTo
    ) {
      list {
        ...MovieFragment
      }
      totalPages
    }
  }
`;

export const GET_GENRES = gql`
  query getFiltersGenres {
    filtersGenresList {
      id
      name
    }
  }
`;

export const GET_RANDOM_MOVIE = gql`
  ${MOVIE_FRAGMENT}
  query getRandomMovie(
    $with_genres: String
    $dateFrom: String
    $dateTo: String
  ) {
    randomMovie(
      with_genres: $with_genres
      dateFrom: $dateFrom
      dateTo: $dateTo
    ) {
      ...MovieFragment
    }
  }
`;
