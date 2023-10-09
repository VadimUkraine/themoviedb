import React, { FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { GenresFilter } from "../GenresFilter";
import { ReleaseDatesFilter } from "../ReleaseDatesFilter";
import { FiltersPanelProps } from "./types";

export const FiltersPanel: FC<FiltersPanelProps> = ({
  selectedGenresIds,
  handleToggleGenreId,
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  handleApplyFilters,
  btnAppleText,
  filtersReleaseDates,
  filtersGenres,
  filterFrom,
  filtersTo,
  genresErrorMessage
}) => {
  return (
    <Box
      sx={{
        minWidth: "260px",
        width: "260px"
      }}
    >
      <Box
        sx={{
          border: "1px solid #e3e3e3",
          boxShadow: "0 2px 8px rgba(0,0,0,.1)",
          minWidth: "260px",
          width: "260px",
          borderRadius: "8px"
        }}
      >
        <ReleaseDatesFilter
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          filtersReleaseDatesText={filtersReleaseDates}
          filterFromText={filterFrom}
          filtersToText={filtersTo}
        />
        <GenresFilter
          selectedGenresIds={selectedGenresIds}
          handleToggleGenreId={handleToggleGenreId}
          filtersGenresText={filtersGenres}
          genresErrorMessage={genresErrorMessage}
        />
      </Box>
      <Button
        variant="contained"
        sx={{
          minWidth: "90%",
          width: "90%",
          m: "10px auto",
          display: "flex"
        }}
        onClick={handleApplyFilters}
      >
        {btnAppleText || "Apply"}
      </Button>
    </Box>
  );
};
