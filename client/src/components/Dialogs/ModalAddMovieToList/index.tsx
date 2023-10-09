/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import { useQuery, useMutation } from "@apollo/client";
import { nanoid } from "nanoid";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  CREATE_LIST,
  GET_USER_LISTS,
  ADD_MOVIE_TO_LIST
} from "../../../apollo/lists";
import { GET_CREATE_LISTS_TRANSLATIONS } from "../../../apollo/translations";
import isUnAuth from "../../../helpers/isUnAuth";
import removeCredentials from "../../../helpers/removeCredentials";
import {
  ModalAddMovieToListTranslationsProps,
  ListOption,
  ModalAddMovieToListProps
} from "./types";

export const ModalAddMovieToList: FC<ModalAddMovieToListProps> = ({
  isOpen,
  handleClose,
  movieId,
  movieTitle,
  posterPath
}) => {
  const navigate = useNavigate();
  const userId = useOutletContext();
  const { data: dataTranslations } = useQuery(GET_CREATE_LISTS_TRANSLATIONS);
  const { data: lists, refetch: refetchUserLists } = useQuery(GET_USER_LISTS, {
    variables: {
      userId,
      skipQuantity: true
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
  const [translations, setTranslations] =
    useState<ModalAddMovieToListTranslationsProps>({});
  const defaultProps = {
    options: lists?.userLists || [],
    getOptionLabel: (option: ListOption) => option.name
  };
  const [value, setValue] = useState<ListOption | null>(null);
  const [isOpenNewList, setIsOpenNewList] = useState(false);
  const [isError, setIsError] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [newListName, setNewListName] = useState("");

  const [CreateListMutation] = useMutation(CREATE_LIST, {
    variables: {
      name: newListName,
      userId,
      id: nanoid()
    },
    onError: () => {
      setConfirmText(translations.errorListExist);
      setIsError(true);
    },
    onCompleted: ({ createList }) => {
      if (createList && createList.name) {
        setConfirmText(translations.listCreated);
        setNewListName("");
        refetchUserLists();
      }
    }
  });

  const [AddMovieToListMutation] = useMutation(ADD_MOVIE_TO_LIST, {
    variables: {
      userId,
      movieId,
      movieTitle,
      posterPath,
      listId: value?.id
    },
    onError: () => {
      setConfirmText(translations.errorMovieExist);
      setIsError(true);
    },
    onCompleted: ({ addMovieToList }) => {
      if (addMovieToList && addMovieToList.movieId) {
        setConfirmText(translations.movieWasAdded);
        setValue(null);
      }
    }
  });

  useEffect(() => {
    if (dataTranslations?.createListsTranslations) {
      setTranslations(dataTranslations?.createListsTranslations);
    }
  }, [dataTranslations]);

  useEffect(() => {
    if (confirmText.length > 0) {
      setTimeout(() => {
        setConfirmText("");
        setIsError(false);
      }, 3000);
    }
  }, [confirmText]);

  const handleCloseListModal = () => {
    const isNewState = false;

    handleClose(isNewState);
    setValue(null);
    setIsOpenNewList(false);
  };

  const handleCreateNewList = () => {
    CreateListMutation({
      variables: {
        name: newListName,
        userId,
        id: nanoid()
      }
    });
  };

  const handleAddMovieToList = (newValue: ListOption | null) => {
    setValue(newValue);
    AddMovieToListMutation({
      variables: {
        userId,
        movieId,
        movieTitle,
        posterPath,
        listId: newValue.id
      }
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseListModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          padding: "3rem 2rem 2rem",
          width: "400px",
          position: "relative"
        }}
      >
        {confirmText.length > 0 && (
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: ".8rem",
              color: isError ? "red" : "green",
              position: "absolute",
              top: "10px"
            }}
          >
            {confirmText}
          </Typography>
        )}
        <Button
          onClick={() => setIsOpenNewList(true)}
          variant="contained"
          size="large"
        >
          {translations.createNewList || "Create New List"}
        </Button>
        {isOpenNewList && (
          <Box
            sx={{
              mt: "20px",

              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <TextField
              id="standard-basic"
              placeholder={translations.nameOfNewList || "Name of new list"}
              variant="standard"
              value={newListName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setNewListName(event.target.value)
              }
            />
            <Button
              variant="outlined"
              size="small"
              onClick={handleCreateNewList}
              disabled={newListName.length === 0}
            >
              {translations.create || "Create"}
            </Button>
          </Box>
        )}
        <Autocomplete
          {...defaultProps}
          id="movie-lists"
          value={value}
          onChange={(event: any, newValue: ListOption | null) => {
            handleAddMovieToList(newValue);
          }}
          disableClearable
          clearOnEscape
          openOnFocus
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                translations.addToOneOfYourLists || "Add to one of your lists"
              }
              variant="standard"
            />
          )}
          sx={{
            width: "100%",
            mt: "20px"
          }}
        />
      </Box>
    </Dialog>
  );
};
