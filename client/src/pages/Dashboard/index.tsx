import React, { FC } from "react";
import Container from "@mui/material/Container";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import { MoviesList } from "../../components/MoviesList";
import { GET_MOVIES_LISTS } from "../../apollo/movies";

export const Dashboard: FC = () => {
  const { loading, error, data } = useQuery(GET_MOVIES_LISTS);

  if (loading) return <Box sx={{ ml: "20px" }}>Loading...</Box>;

  if (error) return <Box sx={{ ml: "20px" }}>Error : {error.message}</Box>;

  if (!data.moviesLists) return <p>No data</p>;

  const {
    moviesLists: { playing, upcoming, popular }
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
      <MoviesList listTitle="Now playing" list={playing} />
      <MoviesList listTitle="Upcoming" list={upcoming} />
      <MoviesList listTitle="Popular" list={popular} />
    </Container>
  );
};
