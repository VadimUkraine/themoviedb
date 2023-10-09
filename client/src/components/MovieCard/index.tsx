import React, { FC, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { ROUTES } from "../../constants/api";
import { ModalAddMovieToList } from "../Dialogs/ModalAddMovieToList";
import isAuthenticated from "../../helpers/isAuthenticated";
import { MovieCardProps } from "./types";

export const MovieCard: FC<MovieCardProps> = ({
  id,
  title,
  releaseDate,
  posterPath,
  btnText,
  noImageText
}) => {
  const isAuth = isAuthenticated();
  const navigate = useNavigate();
  const [isAddToList, setIsAddToList] = useState(false);

  const handleShowDetails = () => {
    navigate(`${ROUTES.movieDetails}/${id}`);
  };

  const handleOpenListModal = () => {
    setIsAddToList(true);
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
      {posterPath ? (
        <CardMedia
          height="340"
          image={posterPath}
          title={title}
          component="img"
        />
      ) : (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            textAlign: "center",
            height: "340px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "lightgrey"
          }}
        >
          {noImageText || "No image"}
        </Typography>
      )}

      <CardContent>
        <Typography
          gutterBottom
          variant="h2"
          component="div"
          sx={{ fontWeight: 600, fontSize: "1em" }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {releaseDate}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          mt: "auto"
        }}
      >
        <Button size="small" onClick={handleShowDetails}>
          {btnText || "Details"}
        </Button>
        {isAuth && (
          <Box
            onClick={handleOpenListModal}
            sx={{
              ml: "auto",
              width: "25px",
              height: "25px",
              cursor: "pointer",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m8 6 13 .001m-13 6h13m-13 6h13M3.5 6h.01m-.01 6h.01m-.01 6h.01M4 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm0 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm0 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
            }}
          />
        )}
      </CardActions>
      {isAddToList && (
        <ModalAddMovieToList
          isOpen={isAddToList}
          handleClose={setIsAddToList}
          movieId={id}
          movieTitle={title}
          posterPath={posterPath}
        />
      )}
    </Card>
  );
};
