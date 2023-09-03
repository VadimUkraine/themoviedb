import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Movies } from "./pages/Movies";
import { RandomMovie } from "./pages/RandomMovie";
import { MovieDetails } from "./pages/MovieDetails";
import { ROUTES } from "./constans/api";

export const App: FC = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path={ROUTES.movies} element={<Movies />} />
      <Route path={ROUTES.randomMovie} element={<RandomMovie />} />
      <Route path={`${ROUTES.movieDetails}/:id`} element={<MovieDetails />} />
    </Route>
  </Routes>
);
