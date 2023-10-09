import React, { FC, useState, useCallback, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import dayjs, { Dayjs } from "dayjs";
import { useQuery } from "@apollo/client";
import LinearProgress from "@mui/material/LinearProgress";
import { FiltersPanel } from "../../components/FiltersPanel";
import { GET_RANDOM_MOVIE } from "../../apollo/movies";
import { MovieCard } from "../../components/MovieCard";
import { GET_RANDOM_MOVIE_TRANSLATIONS } from "../../apollo/translations";
import { RandomMovieTranslationsProps } from "./types";

export const RandomMovie: FC = () => {
  const { data: dataTranslations } = useQuery(GET_RANDOM_MOVIE_TRANSLATIONS);
  const [selectedGenresIds, setSelectedGenresIds] = useState([]);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);
  const { loading, error, data, refetch } = useQuery(GET_RANDOM_MOVIE, {
    fetchPolicy: "network-only",
    variables: {
      page: "1",
      with_genres: "",
      dateFrom: "",
      dateTo: ""
    }
  });
  const [translations, setTranslations] =
    useState<RandomMovieTranslationsProps>({});
  const movie = data?.randomMovie;

  useEffect(() => {
    if (dataTranslations?.randomMovieTranslations) {
      setTranslations(dataTranslations?.randomMovieTranslations);
    }
  }, [dataTranslations]);

  const handleToggleGenreId = useCallback(
    (genreId: number) => {
      const updatedSelectedGenres: number[] = selectedGenresIds.slice(0);
      const isSelected: boolean = updatedSelectedGenres.includes(genreId);

      if (isSelected) {
        setSelectedGenresIds(
          updatedSelectedGenres.filter((id) => id !== genreId)
        );
      } else {
        updatedSelectedGenres.push(genreId);
        setSelectedGenresIds(updatedSelectedGenres);
      }
    },
    [selectedGenresIds]
  );

  const handleApplyFilters = useCallback(() => {
    refetch({
      page: "1",
      with_genres: selectedGenresIds.join(", "),
      dateFrom: dateFrom && dayjs(dateFrom).format("YYYY-MM-DD"),
      dateTo: dateTo && dayjs(dateTo).format("YYYY-MM-DD")
    });
  }, [selectedGenresIds, dateFrom, dateTo, refetch]);

  return (
    <Container
      sx={{
        display: "flex",
        minWidth: "100%",
        pl: "15px",
        pr: "15px"
      }}
    >
      <FiltersPanel
        selectedGenresIds={selectedGenresIds}
        handleToggleGenreId={handleToggleGenreId}
        dateFrom={dateFrom}
        dateTo={dateTo}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        handleApplyFilters={handleApplyFilters}
        btnAppleText={translations.btnApply}
        filtersReleaseDates={translations.filtersReleaseDates}
        filtersGenres={translations.filtersGenres}
        filterFrom={translations.filterFrom}
        filtersTo={translations.filtersTo}
        genresErrorMessage={translations.genresErrorMessage}
      />
      <Box
        sx={{
          mb: "20px",
          ml: "20px",
          fontWeight: 600,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignSelf: "flex-start"
        }}
      >
        {loading && !error && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        {error && !loading && !movie && (
          <Box sx={{ ml: "20px" }}>
            Error : {translations.errorMessage || error.message}
          </Box>
        )}
        {!error && !loading && movie && (
          <MovieCard
            id={movie.id}
            title={movie.title}
            releaseDate={movie.release_date}
            posterPath={movie.poster_path}
            btnText={translations.btnDetails}
            noImageText={translations.noImage}
          />
        )}
        {!error && !loading && !movie && (
          <Box sx={{ ml: "20px" }}>{translations.noData || "No data"}</Box>
        )}
      </Box>
    </Container>
  );
};
