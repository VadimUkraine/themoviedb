import React, { FC } from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import getTimeFromMins from "../../helpers/getTimeFromMins";
import { MovieCardDetailsProps } from "./types";

export const MovieCardDetails: FC<MovieCardDetailsProps> = ({
  movie,
  overviewText,
  noImageText,
  hourReductionText,
  minuteReductionText
}) => {
  return (
    <Box
      sx={{
        height: "490px",
        width: "100%",
        display: "flex",
        position: "relative"
      }}
    >
      <CardMedia
        component="img"
        sx={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${movie.backdrop_path})`,
          opacity: 0.3,
          width: "100%",
          ml: "80px"
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 20,
          display: "flex"
        }}
      >
        {movie.poster_path ? (
          <CardMedia
            height="450"
            image={movie.poster_path}
            component="img"
            sx={{
              width: 300,
              objectFit: "contain"
            }}
          />
        ) : (
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: "1rem",
              textAlign: "center",
              minWidth: "300px",
              height: "450px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: "lightgrey"
            }}
          >
            {noImageText || "No image"}
          </Typography>
        )}
        <Box
          sx={{
            pl: "45px",
            pr: "90px",
            pt: "50px"
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700
            }}
          >
            {movie.title}&nbsp;({movie.release_date.slice(-4)})
          </Typography>

          <Typography variant="body2">
            {movie.release_date}
            &#160; &#9679; &#160;
            {movie.genres.join(", ")}
            &#160; &#9679; &#160;
            {getTimeFromMins(
              movie.runtime,
              hourReductionText,
              minuteReductionText
            )}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontStyle: "italic",
              fontSize: "1.1rem",
              mt: "20px",
              mb: "20px",
              fontWeight: 500
            }}
          >
            {movie.tagline}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              mb: "10px",
              fontSize: "1.3rem"
            }}
          >
            {overviewText || "Overview"}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              fontSize: "1rem",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {movie.overview}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
