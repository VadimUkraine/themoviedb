import React, { FC, useState, useCallback, useEffect } from "react";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import dayjs, { Dayjs } from "dayjs";
import LinearProgress from "@mui/material/LinearProgress";
import { MoviesList } from "../../components/MoviesList";
import { GET_FILTERED_MOVIES } from "../../apollo/movies";
import { FiltersPanel } from "../../components/FiltersPanel";
import { GET_MOVIES_TRANSLATIONS } from "../../apollo/translations";
import { MoviesTranslationsProps } from "./types";

const MAX_PAGES = 500;

export const Movies: FC = () => {
  const { data: dataTranslations } = useQuery(GET_MOVIES_TRANSLATIONS);
  const [page, setPage] = useState(1);
  const [selectedGenresIds, setSelectedGenresIds] = useState([]);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);
  const { loading, error, data, refetch } = useQuery(GET_FILTERED_MOVIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      page: 1,
      with_genres: "",
      dateFrom: "",
      dateTo: ""
    }
  });
  const totalPages = data?.filteredMoviesList?.totalPages || MAX_PAGES;
  const list = data?.filteredMoviesList?.list || [];
  const [translations, setTranslations] = useState<MoviesTranslationsProps>({});

  useEffect(() => {
    if (dataTranslations?.moviesTranslations) {
      setTranslations(dataTranslations?.moviesTranslations);
    }
  }, [dataTranslations]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    refetch({
      page: value,
      with_genres: selectedGenresIds.join(", "),
      dateFrom: dateFrom && dayjs(dateFrom).format("YYYY-MM-DD"),
      dateTo: dateTo && dayjs(dateTo).format("YYYY-MM-DD")
    });
  };

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
      page: 1,
      with_genres: selectedGenresIds.join(", "),
      dateFrom: dateFrom && dayjs(dateFrom).format("YYYY-MM-DD"),
      dateTo: dateTo && dayjs(dateTo).format("YYYY-MM-DD")
    });
    setPage(1);
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
      <Box sx={{ mb: "20px", ml: "20px", fontWeight: 600, width: "100%" }}>
        {loading && !error && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        {error && !loading && (
          <Box sx={{ ml: "20px" }}>
            Error : {translations.errorMessage || error.message}
          </Box>
        )}
        {!error && !loading && list.length > 0 && (
          <MoviesList
            btnDetailsText={translations.btnDetails}
            noImageText={translations.noImage}
            list={list}
          />
        )}
        {!error && !loading && list.length === 0 && (
          <Box sx={{ ml: "20px" }}>{translations.noData || "No data"}</Box>
        )}
        {!error && !loading && list.length > 0 && (
          <Stack spacing={2}>
            <Pagination
              color="primary"
              count={totalPages <= MAX_PAGES ? totalPages : MAX_PAGES}
              page={page}
              onChange={handleChangePage}
              sx={{
                display: "flex",
                margin: "30px auto",
                justifyContent: "center"
              }}
            />
          </Stack>
        )}
      </Box>
    </Container>
  );
};
