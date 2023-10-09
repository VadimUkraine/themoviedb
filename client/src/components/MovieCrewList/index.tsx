import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CrewPersonCard } from "../CrewPersonCard";
import { MovieCrewListProps } from "./types";

export const MovieCrewList: FC<MovieCrewListProps> = ({
  department,
  departmentCrew,
  noImageText
}) => {
  return (
    <Box
      sx={{
        mt: "25px",
        width: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          fontSize: "1.3rem",
          mb: "5px"
        }}
      >
        {department}
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        {departmentCrew.map((person) => (
          <CrewPersonCard
            key={person.id}
            person={person}
            noImageText={noImageText}
          />
        ))}
      </Box>
    </Box>
  );
};
