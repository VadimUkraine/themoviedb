import React, { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ModalAuthProps } from "./types";

export const ModalAuth: FC<ModalAuthProps> = ({
  open,
  onClose,
  loginText,
  isAuthError,
  isUserNameError,
  nameLabel,
  userNameHelperText,
  userName,
  handleChangeUserName,
  isUserPasswordError,
  passwordLabel,
  userPasswordHelperText,
  userPassword,
  handleChangeUserPassword,
  handleLoginUser,
  loginToAccountBtnText,
  handleRegisterUser,
  registerBtnText
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
          padding: "40px 30px",
          display: "flex",
          flexDirection: "column",
          minWidth: "500px",
          alignItems: "flex-start",
          position: "relative"
        }}
      >
        {loginText.length > 0 && (
          <Typography
            variant="h6"
            component="div"
            sx={{
              position: "absolute",
              top: "10px",
              fontSize: "1rem",
              lineHeight: "1",
              textAlign: "center",
              maxWidth: "500px",
              width: "100%",
              color: isAuthError ? "red" : "black"
            }}
          >
            {loginText}
          </Typography>
        )}
        <TextField
          error={isUserNameError}
          id="outlined-name-text"
          label={nameLabel || "Name"}
          helperText={userNameHelperText || "At least three characters"}
          fullWidth
          value={userName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeUserName(event)
          }
        />
        <TextField
          error={isUserPasswordError}
          id="outlined-password-text"
          label={passwordLabel || "Password"}
          helperText={
            userPasswordHelperText ||
            "The password should contain a minimum of 8 characters, including 1 number, 1 uppercase letter, and 1 lowercase letter"
          }
          fullWidth
          type="password"
          sx={{
            mt: "20px"
          }}
          value={userPassword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeUserPassword(event)
          }
        />
        <Box
          sx={{
            pt: "30px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <Button
            onClick={handleLoginUser}
            variant="contained"
            size="large"
            color="success"
          >
            {loginToAccountBtnText || "Login to account"}
          </Button>
          <Button onClick={handleRegisterUser} variant="contained" size="large">
            {registerBtnText || "Register"}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
