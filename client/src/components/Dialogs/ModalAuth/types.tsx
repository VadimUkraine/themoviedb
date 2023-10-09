/* eslint-disable no-unused-vars */
import React from "react";

type ModalAuthProps = {
  open: boolean;
  onClose: () => void;
  loginText?: string;
  isAuthError: boolean;
  isUserNameError: boolean;
  nameLabel?: string;
  userNameHelperText?: string;
  userName: string;
  handleChangeUserName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isUserPasswordError: boolean;
  passwordLabel?: string;
  userPasswordHelperText?: string;
  userPassword: string;
  handleChangeUserPassword: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleLoginUser: () => void;
  loginToAccountBtnText?: string;
  handleRegisterUser: () => void;
  registerBtnText?: string;
};

export { ModalAuthProps };
