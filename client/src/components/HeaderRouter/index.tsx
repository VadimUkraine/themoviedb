import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import { HeaderRouterProps } from "./types";
import { ROUTES } from "../../constants/api";

export const HeaderRouter: FC<HeaderRouterProps> = ({
  isAuth,
  dashboardLinkText,
  moviesLinkText,
  randomMovieLinkText,
  listsText
}) => {
  const location = useLocation();

  return (
    <>
      <Typography
        variant="h6"
        component="div"
        sx={{
          "> a": {
            m: "7px",
            color: location.pathname === "/" ? "black" : "#fff",
            textDecoration: location.pathname === "/" ? "inherit" : "underline"
          },
          "> a:hover": {
            cursor: location.pathname === "/" ? "not-allowed" : "pointer"
          }
        }}
      >
        <Link to="/">{dashboardLinkText || "Dashboard"}</Link>
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{
          "> a": {
            m: "7px",
            color: location.pathname === ROUTES.movies ? "black" : "#fff",
            textDecoration:
              location.pathname === ROUTES.movies ? "inherit" : "underline"
          },
          "> a:hover": {
            cursor:
              location.pathname === ROUTES.movies ? "not-allowed" : "pointer"
          }
        }}
      >
        <Link to={ROUTES.movies}>{moviesLinkText || "Movies"}</Link>
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{
          "> a": {
            m: "7px",
            color: location.pathname === ROUTES.randomMovie ? "black" : "#fff",
            textDecoration:
              location.pathname === ROUTES.randomMovie ? "inherit" : "underline"
          },
          "> a:hover": {
            cursor:
              location.pathname === ROUTES.randomMovie
                ? "not-allowed"
                : "pointer"
          }
        }}
      >
        <Link to={ROUTES.randomMovie}>
          {randomMovieLinkText || "Random movie"}
        </Link>
      </Typography>
      {isAuth && (
        <Typography
          variant="h6"
          component="div"
          sx={{
            "> a": {
              m: "7px",
              color: location.pathname === ROUTES.lists ? "black" : "#fff",
              textDecoration:
                location.pathname === ROUTES.lists ? "inherit" : "underline"
            },
            "> a:hover": {
              cursor:
                location.pathname === ROUTES.lists ? "not-allowed" : "pointer"
            }
          }}
        >
          <Link to={ROUTES.lists}>{listsText || "Lists"}</Link>
        </Typography>
      )}
    </>
  );
};
