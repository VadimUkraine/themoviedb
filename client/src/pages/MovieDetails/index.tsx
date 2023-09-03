import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { GET_MOVIE_DETAILS } from "../../apollo/movies";
import { MovieCardDetails } from "../../components/MovieCardDetails";
import { MovieCrew } from "../../components/MovieCrew";
import { MovieDetailsRecommendations } from "../../components/MovieDetailsRecommendations";
import { Divider } from "../../components/Divider";

export const MovieDetails: FC = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_MOVIE_DETAILS, {
    variables: { id }
  });

  if (loading) return <Box sx={{ ml: "20px" }}>Loading...</Box>;

  if (error) return <Box sx={{ ml: "20px" }}>Error : {error.message}</Box>;

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
      <MovieCardDetails movie={details} />
      <MovieCrew crew={crew} />
      <Divider />
      <MovieDetailsRecommendations recommendations={recommendations} />
    </Container>
  );
};
