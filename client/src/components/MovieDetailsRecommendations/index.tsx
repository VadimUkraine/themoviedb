import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { RecommendationCard } from "../../components/RecommendationCard";

export const MovieDetailsRecommendations: FC = ({ recommendations }) => {
  return (
    <Box
      sx={{
        width: "100%",
        pb: "20px",
        overflowX: "auto",
        mb: "30px"
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          fontSize: "1.3rem",
          mb: "20px"
        }}
      >
        Recommendations
      </Typography>
      <Box
        sx={{
          display: "flex"
        }}
      >
        {recommendations.map((item) => (
          <RecommendationCard key={item.id} recommendation={item} />
        ))}
      </Box>
    </Box>
  );
};
