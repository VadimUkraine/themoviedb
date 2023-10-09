import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import getCrewWithDepartments from "../../helpers/getCrewWithDepartments";
import { MovieCrewList } from "../MovieCrewList";
import { MovieCrewProps } from "./types";

export const MovieCrew: FC<MovieCrewProps> = ({
  crew,
  crewHeaderText,
  noImageText
}) => {
  const crewWithDepartments = getCrewWithDepartments(crew);
  const departments = Object.keys(crewWithDepartments);

  return (
    <Box
      sx={{
        mt: "30px",
        mb: "25px",
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
          fontSize: "1.3rem"
        }}
      >
        {crewHeaderText || "Crew"}
        <Typography
          variant="body2"
          sx={{
            fontSize: "1.3rem",
            opacity: ".5",
            ml: "7px"
          }}
        >
          {crew.length}
        </Typography>
      </Typography>
      {departments.map((department) => (
        <MovieCrewList
          key={department}
          department={department}
          departmentCrew={crewWithDepartments[department]}
          noImageText={noImageText}
        />
      ))}
    </Box>
  );
};
