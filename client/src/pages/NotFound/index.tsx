import React, { FC } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useQuery } from "@apollo/client";
import { GET_NOT_FOUND } from "../../apollo/translations";

export const NotFound: FC = () => {
  const { data } = useQuery(GET_NOT_FOUND);

  return (
    <Container
      sx={{
        display: "flex",
        minWidth: "100%",
        pl: "15px",
        pr: "15px"
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          fontSize: "1rem",
          margin: "0 auto"
        }}
      >
        {data?.notFoundTranslations?.notFound || "Not Found"}
      </Typography>
    </Container>
  );
};
