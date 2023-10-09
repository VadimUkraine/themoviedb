import React, { FC, useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import LinearProgress from "@mui/material/LinearProgress";
import { GET_USER_MOVIES_LIST } from "../../apollo/lists";
import { MovieListCard } from "../../components/MovieListCard";
import { GET_USER_MOVIES_LIST_TRANSLATIONS } from "../../apollo/translations";
import isUnAuth from "../../helpers/isUnAuth";
import removeCredentials from "../../helpers/removeCredentials";
import { UserMoviesListTranslationsProps, MovieListItem } from "./types";

export const UserMoviesList: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: dataTranslations } = useQuery(
    GET_USER_MOVIES_LIST_TRANSLATIONS
  );
  const {
    data,
    loading,
    error,
    refetch: refetchUserMoviesList
  } = useQuery(GET_USER_MOVIES_LIST, {
    fetchPolicy: "network-only",
    variables: {
      listId: id
    },
    onError: ({ graphQLErrors }) => {
      const isUserUnAuth = isUnAuth(graphQLErrors);

      if (isUserUnAuth) {
        removeCredentials();
        navigate("/");
        navigate(0);
      }
    }
  });

  const [translations, setTranslations] =
    useState<UserMoviesListTranslationsProps>({});
  const movies = data?.userMoviesList;

  useEffect(() => {
    if (dataTranslations?.userMoviesListTranslations) {
      setTranslations(dataTranslations?.userMoviesListTranslations);
    }
  }, [dataTranslations]);

  return (
    <Container
      sx={{
        display: "flex",
        minWidth: "100%",
        pl: "15px",
        pr: "15px",
        flexDirection: "column"
      }}
    >
      {loading && !error && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {error && !loading && !movies && (
        <Box sx={{ ml: "20px" }}>
          Error : {translations.errorMessage || error.message}
        </Box>
      )}
      {!error && !loading && movies.length === 0 && (
        <Box sx={{ margin: "0 auto" }}>{translations.noData || "No data"}</Box>
      )}
      {!error && !loading && movies.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {movies.map((item: MovieListItem, index: number) => (
            <MovieListCard
              key={item.movieId}
              movie={item}
              movieQueue={index + 1}
              btnText={translations.delete}
              refetchUserMoviesList={refetchUserMoviesList}
              noImageText={translations.noImage}
              listId={id}
              isLastMovieInList={movies.length === 1}
            />
          ))}
        </Box>
      )}
    </Container>
  );
};
