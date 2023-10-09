import React, { FC } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMutation } from "@apollo/client";
import { DELETE_LIST } from "../../apollo/lists";
import { ListCardProps } from "./types";

export const ListCard: FC<ListCardProps> = ({
  list,
  handleOpenUserMovieList,
  deleteBtnText,
  itemText,
  itemsText,
  refetchUserLists
}) => {
  const [DeleteListMutation] = useMutation(DELETE_LIST, {
    variables: {
      listId: list.id
    },
    onCompleted: ({ deleteList }) => {
      if (deleteList && deleteList.name && deleteList.id) {
        refetchUserLists();
      }
    }
  });

  const getListItemText = () => {
    if (list.quantity === 1) {
      return itemText || "item";
    }
    return itemsText || "items";
  };

  const handleDeleteUserList = () => {
    DeleteListMutation({
      variables: {
        listId: list.id
      }
    });
  };

  return (
    <Box
      sx={{
        margin: "10px",
        backgroundColor: "rgba(3,37,65,.8)",
        color: "white",
        width: "300px",
        height: "200px",
        borderRadius: "7px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography
        onClick={() => handleOpenUserMovieList(list.id)}
        variant="body2"
        sx={{
          fontWeight: 700,
          fontSize: "1.7rem",
          padding: "7px",
          cursor: "pointer",
          fontStyle: "italic"
        }}
      >
        {list.name}
      </Typography>
      <Typography variant="body2">
        {list.quantity} {getListItemText()}
      </Typography>
      <Button
        onClick={handleDeleteUserList}
        variant="contained"
        size="small"
        color="warning"
        sx={{
          mt: "1rem"
        }}
      >
        {deleteBtnText || "Delete"}
      </Button>
    </Box>
  );
};
