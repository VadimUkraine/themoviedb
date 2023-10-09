/* eslint-disable no-unused-vars */
import React from "react";

type AuthSelectorProps = {
  isAuth: boolean;
  handleAuth: (event: React.MouseEvent<HTMLElement>) => void;
  loginBtnText?: string;
  anchorAuthEl: null | HTMLElement;
  handleAuthClose: () => void;
  handleSingOut: () => void;
  handleSingIn: () => void;
  signOutText?: string;
  singInText?: string;
};

export { AuthSelectorProps };
