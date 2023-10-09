import React, { FC, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { useMutation } from "@apollo/client";
import { nanoid } from "nanoid";
import { useNavigate, useOutletContext } from "react-router-dom";
import { CREATE_LIST } from "../../../apollo/lists";
import isUnAuth from "../../../helpers/isUnAuth";
import removeCredentials from "../../../helpers/removeCredentials";
import { ModalCreateListProps } from "./types";

export const ModalCreateList: FC<ModalCreateListProps> = ({
  isOpen,
  handleClose,
  refetchUserLists,
  errorListExistText,
  listCreatedText,
  placeholderText,
  createBtnText
}) => {
  const navigate = useNavigate();
  const userId = useOutletContext();
  const [isError, setIsError] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [newListName, setNewListName] = useState("");

  const [CreateListMutation] = useMutation(CREATE_LIST, {
    variables: {
      name: newListName,
      userId,
      id: nanoid()
    },
    onError: ({ graphQLErrors }) => {
      const isUserUnAuth = isUnAuth(graphQLErrors);

      if (isUserUnAuth) {
        removeCredentials();
        navigate("/");
        navigate(0);
        return;
      }

      setConfirmText(errorListExistText || "This List is exist");
      setIsError(true);
    },
    onCompleted: ({ createList }) => {
      if (createList && createList.name) {
        setConfirmText(listCreatedText || "New List was created");
        setNewListName("");
      }
    }
  });

  useEffect(() => {
    if (confirmText.length > 0) {
      setTimeout(() => {
        if (!isError) refetchUserLists();
        setConfirmText("");
        setIsError(false);
      }, 1000);
    }
  }, [confirmText, refetchUserLists, isError]);

  const handleCloseListModal = () => {
    const isNewState = false;

    handleClose(isNewState);
    setNewListName("");
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

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseListModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          padding: "3rem 2rem",
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <TextField
            id="standard-basic"
            placeholder={placeholderText || "Name of new list"}
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
            {createBtnText || "Create"}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
