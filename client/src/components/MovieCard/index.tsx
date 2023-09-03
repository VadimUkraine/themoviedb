import React, { FC } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export const MovieCard: FC = ({ id, title, releaseDate, posterPath }) => {
  const navigate = useNavigate();

  const handleShowDetails = () => {
    navigate(`/movie-details/${id}`);
  };

  return (
    <Card
      sx={{
        width: 225,
        mr: "20px",
        mb: "20px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <CardMedia
        height="340"
        image={posterPath}
        title={title}
        component="img"
      />

      <CardContent>
        <Typography
          gutterBottom
          variant="h2"
          component="div"
          sx={{ fontWeight: 600, fontSize: "1em" }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {releaseDate}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          mt: "auto"
        }}
        onClick={handleShowDetails}
      >
        <Button size="small">Details</Button>
      </CardActions>
    </Card>
  );
};
