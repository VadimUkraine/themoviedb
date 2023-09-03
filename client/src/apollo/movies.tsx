import { gql } from "@apollo/client";

export const GET_MOVIES_LISTS = gql`
  query getMoviesLists {
    moviesLists {
      playing {
        id
        title
        poster_path
        release_date
      }
      upcoming {
        id
        title
        poster_path
        release_date
      }
      popular {
        id
        title
        poster_path
        release_date
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
