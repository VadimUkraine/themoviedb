import React, { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MovieCard } from "../MovieCard";
import { MoviesListProps } from "./types";

export const MoviesList: FC<MoviesListProps> = ({
  listTitle,
  list,
  btnDetailsText,
  noImageText
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      {listTitle && listTitle.length > 0 && (
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ mb: "20px", fontWeight: 600 }}
        >
          {listTitle}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          minWidth: "100%"
        }}
      >
        {list.map(
          ({
            id,
            title,
            release_date: releaseDate,
            poster_path: posterPath
          }) => (
            <MovieCard
              key={id}
              id={id}
              title={title}
              releaseDate={releaseDate}
              posterPath={posterPath}
              btnText={btnDetailsText}
              noImageText={noImageText}
            />
          )
        )}
      </Box>
    </Box>
  );
};
