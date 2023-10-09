import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { GET_MOVIE_DETAILS } from "../../apollo/movies";
import { MovieCardDetails } from "../../components/MovieCardDetails";
import { MovieCrew } from "../../components/MovieCrew";
import { MovieDetailsRecommendations } from "../../components/MovieDetailsRecommendations";
import { Divider } from "../../components/Divider";
import { GET_MOVIE_DETAILS_TRANSLATIONS } from "../../apollo/translations";
import { MovieDetailsTranslationsProps } from "./types";

export const MovieDetails: FC = () => {
  const { data: dataTranslations } = useQuery(GET_MOVIE_DETAILS_TRANSLATIONS);
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_MOVIE_DETAILS, {
    variables: { id }
  });
  const [translations, setTranslations] =
    useState<MovieDetailsTranslationsProps>({});

  useEffect(() => {
    if (dataTranslations?.movieDetailsTranslations) {
      setTranslations(dataTranslations?.movieDetailsTranslations);
    }
  }, [dataTranslations]);

  if (loading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ ml: "20px" }}>
        Error : {translations.errorMessage || error.message}
      </Box>
    );

  const {
    movieById: { details, crew, recommendations }
  } = data;

  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        minWidth: "100%",
        pl: "15px",
        pr: "15px"
      }}
    >
      <MovieCardDetails
        movie={details}
        overviewText={translations.overview}
        noImageText={translations.noImage}
        hourReductionText={translations.hour}
        minuteReductionText={translations.minute}
      />
      <MovieCrew
        crew={crew}
        crewHeaderText={translations.crew}
        noImageText={translations.noImage}
      />
      <Divider />
      {recommendations.length > 0 && (
        <MovieDetailsRecommendations
          recommendations={recommendations}
          recommendationsHeaderText={translations.recommendations}
        />
      )}
    </Container>
  );
};
