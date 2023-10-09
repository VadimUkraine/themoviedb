import React, { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { ModalReloadPageProps } from "./types";

export const ModalReloadPage: FC<ModalReloadPageProps> = ({
  open,
  onClose,
  reloadPage,
  btnReloadPageText
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Button
        onClick={reloadPage}
        variant="contained"
        size="large"
        sx={{ ml: "auto" }}
      >
        {btnReloadPageText || "Reload page"}
      </Button>
    </Dialog>
  );
};
