import React, { FC } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { REMOVE_USER_MOVIE_FROM_LIST } from "../../apollo/lists";
import { ROUTES } from "../../constants/api";
import { MovieListCardProps } from "./types";

export const MovieListCard: FC<MovieListCardProps> = ({
  movie,
  movieQueue,
  btnText,
  refetchUserMoviesList,
  noImageText,
  listId,
  isLastMovieInList
}) => {
  const navigate = useNavigate();
  const [RemoveUserMovieMutation] = useMutation(REMOVE_USER_MOVIE_FROM_LIST, {
    variables: {
      listId,
      movieId: movie.movieId
    },
    onCompleted: ({ removeUserMovie }) => {
      if (removeUserMovie && removeUserMovie.movieId) {
        if (isLastMovieInList) {
          navigate(`${ROUTES.lists}`);
        } else {
          refetchUserMoviesList();
        }
      }
    }
  });

  const handleRemoveUserMovie = () => {
    RemoveUserMovieMutation({
      variables: {
        listId,
        movieId: movie.movieId
      }
    });
  };

  const handleShowDetails = () => {
    navigate(`${ROUTES.movieDetails}/${movie.movieId}`);
  };

  return (
    <Card
      sx={{
        width: 225,
        mr: "20px",
        mb: "20px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {movie.posterPath ? (
        <CardMedia
          height="340"
          image={movie.posterPath}
          title={movie.movieTitle}
          component="img"
          onClick={handleShowDetails}
          sx={{
            cursor: "pointer"
          }}
        />
      ) : (
        <Typography
          onClick={handleShowDetails}
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            textAlign: "center",
            height: "340px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "lightgrey",
            cursor: "pointer"
          }}
        >
          {noImageText || "No image"}
        </Typography>
      )}

      <CardActions
        sx={{
          mt: "auto",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#082567",
          color: "white",
          fontWeight: 600
        }}
      >
        {movieQueue}
        <Button
          sx={{
            color: "white",
            fontWeight: 600
          }}
          size="small"
          onClick={handleRemoveUserMovie}
        >
          {btnText || "Delete"}
        </Button>
      </CardActions>
    </Card>
  );
};
