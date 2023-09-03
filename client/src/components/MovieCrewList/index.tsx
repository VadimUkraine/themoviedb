import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CrewPersonCard } from "../CrewPersonCard";

export const MovieCrewList: FC = ({ department, departmentCrew }) => {
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
          <CrewPersonCard key={person.id} person={person} />
        ))}
      </Box>
    </Box>
  );
};
