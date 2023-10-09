import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Movies } from "./pages/Movies";
import { RandomMovie } from "./pages/RandomMovie";
import { MovieDetails } from "./pages/MovieDetails";
import { Lists } from "./pages/Lists";
import { UserMoviesList } from "./pages/UserMoviesList";
import { NotFound } from "./pages/NotFound";
import { ROUTES } from "./constants/api";
import isAuthenticated from "./helpers/isAuthenticated";

const routes = [
  { path: "/", element: Dashboard },
  { path: ROUTES.movies, element: Movies },
  { path: ROUTES.randomMovie, element: RandomMovie },
  { path: `${ROUTES.movieDetails}/:id`, element: MovieDetails },
  { path: "*", element: NotFound }
];

const protectedRoutes = [
  { path: `${ROUTES.lists}`, element: Lists },
  { path: `${ROUTES.lists}/:id`, element: UserMoviesList }
];

const getRoutes = (isAuth: boolean) => {
  return isAuth ? [...routes, ...protectedRoutes] : routes;
};

export const App: FC = () => {
  const isAuth = isAuthenticated();

  return (
    <Routes>
      <Route element={<Layout />}>
        {getRoutes(isAuth).map((route, key) => (
          <Route key={key} path={route.path} element={<route.element />} />
        ))}
      </Route>
    </Routes>
  );
};
