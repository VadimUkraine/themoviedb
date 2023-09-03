import React, { FC } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { ROUTES } from "../../constans/api";

export const Header: FC = () => {
  return (
    <Box
      sx={{
        pl: "15px",
        pr: "15px",
        pt: "15px",
        pb: "15px"
      }}
    >
      <Link
        href="/"
        sx={{
          m: "7px"
        }}
      >
        Dashboard
      </Link>
      <Link
        href={ROUTES.movies}
        sx={{
          m: "7px"
        }}
      >
        Movies
      </Link>
      <Link
        href={ROUTES.randomMovie}
        sx={{
          m: "7px"
        }}
      >
        Random movie
      </Link>
    </Box>
  );
};
