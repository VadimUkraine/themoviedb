import React, { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useQuery } from "@apollo/client";
import LinearProgress from "@mui/material/LinearProgress";
import { GET_GENRES } from "../../apollo/movies";
import { GenresFilterProps } from "./types";

export const GenresFilter: FC<GenresFilterProps> = ({
  selectedGenresIds,
  handleToggleGenreId,
  filtersGenresText,
  genresErrorMessage
}) => {
  const { loading, error, data } = useQuery(GET_GENRES);

  if (loading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ ml: "20px" }}>
        Error : {genresErrorMessage || error.message}
      </Box>
    );

  return data ? (
    <Box
      sx={{
        p: "14px 16px 16px",
        borderTop: "1px solid #eee"
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: "1rem",
          fontWeight: 600,
          mb: "10px"
        }}
      >
        {filtersGenresText || "Genres"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        {data.filtersGenresList.map((genre) => {
          const isSelected = selectedGenresIds.includes(genre.id);

          return (
            <Box
              onClick={() => handleToggleGenreId(genre.id)}
              key={genre.id}
              sx={{
                display: "inline-flex",
                borderRadius: "14px",
                border: "1px solid #9e9e9e",
                p: "4px 12px",
                fontSize: ".9em",
                mr: "6px",
                mt: "8px",
                cursor: "pointer",
                color: () => (isSelected ? "#fff" : "#000"),
                backgroundColor: () =>
                  isSelected ? "rgba(1,180,228,1)" : "#fff",
                borderColor: () =>
                  isSelected ? "rgba(1,180,228,1)" : "1px solid #9e9e9e",
                "&:hover": {
                  borderColor: "rgba(1,180,228,1)"
                }
              }}
            >
              {genre.name}
            </Box>
          );
        })}
      </Box>
    </Box>
  ) : null;
};
