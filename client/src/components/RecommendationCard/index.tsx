import React, { FC } from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/api";
import { RecommendationProps } from "./types";

export const RecommendationCard: FC<RecommendationProps> = ({
  recommendation
}) => {
  const navigate = useNavigate();

  const handleShowDetails = () => {
    navigate(`${ROUTES.movieDetails}/${recommendation.id}`);
  };

  return (
    <Box
      sx={{
        mr: "20px",
        width: "190px",
        display: "block"
      }}
    >
      {recommendation.poster_path ? (
        <CardMedia
          onClick={handleShowDetails}
          image={recommendation.poster_path}
          component="img"
          sx={{
            width: "190px",
            height: "200px",
            borderRadius: "15px",
            objectFit: "fill",
            cursor: "pointer"
          }}
        />
      ) : (
        <Typography
          onClick={handleShowDetails}
          variant="body2"
          sx={{
            fontSize: "1rem",
            textAlign: "center",
            width: "190px",
            height: "200px",
            borderRadius: "15px",
            display: "flex",
            border: "1px solid grey",
            justifyContent: "center",
            pr: "3px",
            pl: "3px",
            flexDirection: "column",
            cursor: "pointer"
          }}
        >
          No image
        </Typography>
      )}
      <Box
        sx={{
          pt: "7px",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: "1rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {recommendation.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "1rem",
            ml: "20px"
          }}
        >
          {recommendation.vote_average}%
        </Typography>
      </Box>
    </Box>
  );
};
