import React, { FC, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { MoviesList } from "../../components/MoviesList";
import { GET_MOVIES_LISTS } from "../../apollo/movies";
import { GET_DASHBOARD_TRANSLATIONS } from "../../apollo/translations";
import { DashboardTranslationsProps } from "./types";

export const Dashboard: FC = () => {
  const { data: dataTranslations } = useQuery(GET_DASHBOARD_TRANSLATIONS);
  const { loading, error, data } = useQuery(GET_MOVIES_LISTS, {
    fetchPolicy: "cache-and-network"
  });
  const [translations, setTranslations] = useState<DashboardTranslationsProps>(
    {}
  );

  useEffect(() => {
    if (dataTranslations?.dashboardTranslations) {
      setTranslations(dataTranslations?.dashboardTranslations);
    }
  }, [dataTranslations]);

  if (loading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ ml: "20px" }}>
        Error : {translations.errorMessage || error.message}
      </Box>
    );

  if (!data.moviesLists)
    return (
      <Box sx={{ mb: "20px", ml: "20px", fontWeight: 600 }}>
        {translations.noData || "No data"}
      </Box>
    );

  const {
    moviesLists: { playing, upcoming, popular }
  } = data;

  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        minWidth: "100%",
        pl: "15px",
        pr: "15px"
      }}
    >
      <MoviesList
        listTitle={translations.nowPlaying || "Now playing"}
        list={playing}
        btnDetailsText={translations.btnDetails}
        noImageText={translations.noImage}
      />
      <MoviesList
        listTitle={translations.upcoming || "Upcoming"}
        list={upcoming}
        btnDetailsText={translations.btnDetails}
        noImageText={translations.noImage}
      />
      <MoviesList
        listTitle={translations.popular || "Popular"}
        list={popular}
        btnDetailsText={translations.btnDetails}
        noImageText={translations.noImage}
      />
    </Container>
  );
};
