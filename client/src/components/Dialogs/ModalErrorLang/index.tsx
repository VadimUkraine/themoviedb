import React, { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ModalErrorLangProps } from "./types";

export const ModalErrorLang: FC<ModalErrorLangProps> = ({
  open,
  onClose,
  closeErrorModal,
  errorMessageText,
  closeBtnText
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          padding: "2rem"
        }}
      >
        <Typography variant="h6" component="div">
          {errorMessageText || "Error to get language settings"}
        </Typography>
        <Button
          onClick={closeErrorModal}
          variant="contained"
          size="large"
          sx={{ ml: "auto", mt: "2rem" }}
        >
          {closeBtnText || "Close"}
        </Button>
      </Box>
    </Dialog>
  );
};
