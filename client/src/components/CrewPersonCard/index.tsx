import React, { FC } from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const CrewPersonCard: FC = ({ person }) => {
  return (
    <Box
      sx={{
        mb: "15px",
        mr: "5px",
        width: "250px",
        display: "flex"
      }}
    >
      {person.profile_path ? (
        <CardMedia
          image={person.profile_path}
          component="img"
          sx={{
            width: "66px",
            height: "66px",
            borderRadius: "4px"
          }}
        />
      ) : (
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.55rem",
            textAlign: "center",
            width: "66px",
            height: "66px",
            borderRadius: "4px",
            display: "flex",
            border: "1px solid grey",
            justifyContent: "center",
            pr: "3px",
            pl: "3px",
            flexDirection: "column"
          }}
        >
          No image
        </Typography>
      )}
      <Box
        sx={{
          pr: "10px",
          pl: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            display: "inline-flex"
          }}
        >
          {person.name}
        </Typography>
        <Typography variant="body2">{person.job}</Typography>
      </Box>
    </Box>
  );
};
