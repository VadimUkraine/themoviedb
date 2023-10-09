import React, { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReleaseDatesFilterProps } from "./types";

export const ReleaseDatesFilter: FC<ReleaseDatesFilterProps> = ({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  filtersReleaseDatesText,
  filterFromText,
  filtersToText
}) => (
  <Box
    sx={{
      p: "14px 16px 16px"
    }}
  >
    <Typography
      variant="h3"
      sx={{
        fontSize: "1rem",
        fontWeight: 600,
        mb: "20px"
      }}
    >
      {filtersReleaseDatesText || "Release Dates"}
    </Typography>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "130px"
        }}
      >
        <DatePicker
          label={filterFromText || "From"}
          value={dateFrom}
          onChange={(newValue) => setDateFrom(newValue)}
          format="DD/MM/YYYY"
        />
        <DatePicker
          label={filtersToText || "To"}
          value={dateTo}
          onChange={(newValue) => setDateTo(newValue)}
          format="DD/MM/YYYY"
        />
      </Box>
    </LocalizationProvider>
  </Box>
);
