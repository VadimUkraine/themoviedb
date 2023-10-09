import React, { FC, useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useQuery } from "@apollo/client";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useOutletContext } from "react-router-dom";
import { GET_USER_LISTS } from "../../apollo/lists";
import { ListCard } from "../../components/ListCard";
import { GET_USER_LISTS_TRANSLATIONS } from "../../apollo/translations";
import { ModalCreateList } from "../../components/Dialogs/ModalCreateList";
import { ROUTES } from "../../constants/api";
import isUnAuth from "../../helpers/isUnAuth";
import removeCredentials from "../../helpers/removeCredentials";
import { ListsTranslationsProps, ListItem } from "./types";

export const Lists: FC = () => {
  const userId = useOutletContext();
  const navigate = useNavigate();
  const { data: dataTranslations } = useQuery(GET_USER_LISTS_TRANSLATIONS);
  const {
    data,
    loading,
    error,
    refetch: refetchUserLists
  } = useQuery(GET_USER_LISTS, {
    fetchPolicy: "network-only",
    variables: {
      userId,
      skipQuantity: false
    },
    onError: ({ graphQLErrors }) => {
      const isUserUnAuth = isUnAuth(graphQLErrors);

      if (isUserUnAuth) {
        removeCredentials();
        navigate("/");
        navigate(0);
      }
    }
  });

  const [isOpenCreateList, setIsOpenCreateList] = useState(false);
  const [translations, setTranslations] = useState<ListsTranslationsProps>({});
  const lists = data?.userLists;

  useEffect(() => {
    if (dataTranslations?.userListsTranslations) {
      setTranslations(dataTranslations?.userListsTranslations);
    }
  }, [dataTranslations]);

  const handleOpenUserMovieList = (listId: string) => {
    const isNoMovies =
      lists.find((item: ListItem) => item.id === listId).quantity === 0;

    if (isNoMovies) return;

    navigate(`${ROUTES.lists}/${listId}`);
  };

  const handleCreateUserList = () => {
    setIsOpenCreateList(true);
  };

  return (
    <Container
      sx={{
        display: "flex",
        minWidth: "100%",
        pl: "15px",
        pr: "15px",
        flexDirection: "column"
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pl: "10px",
          pr: "10px",
          mb: "2rem"
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: "1.5rem"
          }}
        >
          {translations.myLists || "My lists"}
        </Typography>
        <Button
          onClick={handleCreateUserList}
          variant="contained"
          size="small"
          color="secondary"
        >
          {translations.createList || "Create List"}
        </Button>
      </Box>
      {loading && !error && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {error && !loading && !lists && (
        <Box sx={{ ml: "20px" }}>
          Error : {translations.errorMessage || error.message}
        </Box>
      )}
      {!error && !loading && lists.length === 0 && (
        <Box sx={{ margin: "0 auto" }}>{translations.noData || "No data"}</Box>
      )}
      {!error && !loading && lists.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {lists.map((item: ListItem) => (
            <ListCard
              key={item.id}
              list={item}
              handleOpenUserMovieList={handleOpenUserMovieList}
              deleteBtnText={translations.delete}
              itemText={translations.item}
              itemsText={translations.items}
              refetchUserLists={refetchUserLists}
            />
          ))}
        </Box>
      )}
      <ModalCreateList
        isOpen={isOpenCreateList}
        handleClose={setIsOpenCreateList}
        refetchUserLists={refetchUserLists}
        errorListExistText={translations.errorListExist}
        listCreatedText={translations.listCreated}
        placeholderText={translations.nameOfNewList}
        createBtnText={translations.create}
      />
    </Container>
  );
};
