import React, { FC, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import Toolbar from "@mui/material/Toolbar";
import { useQuery, useMutation } from "@apollo/client";
import { LANGS } from "../../constants/variables";
import { GET_LANGUAGE, CHANGE_LANGUAGE } from "../../apollo/settings";
import { GET_HEADER_TRANSLATIONS } from "../../apollo/translations";
import { REGISTER_MUTATION, LOGIN_MUTATION } from "../../apollo/auth";
import validatePassword from "../../helpers/validatePassword";
import setCredentials from "../../helpers/setCredentials";
import removeCredentials from "../../helpers/removeCredentials";
import { ModalReloadPage } from "../Dialogs/ModalReloadPage";
import { ModalErrorLang } from "../Dialogs/ModalErrorLang";
import { ModalAuth } from "../Dialogs/ModalAuth";
import { HeaderRouter } from "../HeaderRouter";
import { AuthSelector } from "../Selectors/AuthSelector";
import { LangSelector } from "../Selectors/LangSelector";
import { HeaderTranslationsProps, HeaderProps } from "./types";

export const Header: FC<HeaderProps> = ({ isAuth }) => {
  const { data: dataTranslations } = useQuery(GET_HEADER_TRANSLATIONS);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState<string>(LANGS.EN);
  const [open, setOpen] = useState(false);
  const [preSelectedLang, setPreselectedLang] = useState<string>("");
  const [isErrorShow, setIsErrorShow] = useState(false);
  const { data: currentLang, error: currentLangError } = useQuery(GET_LANGUAGE);
  const [ChangeLanguage, { data: choosenLang, error: langError }] =
    useMutation(CHANGE_LANGUAGE);
  const [translations, setTranslations] = useState<HeaderTranslationsProps>({});
  const [anchorAuthEl, setAnchorAuthEl] = useState<null | HTMLElement>(null);
  const [isLogin, setIsLogin] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [isUserNameError, setIsUserNameError] = React.useState(false);
  const [isUserPasswordError, setIsUserPasswordError] = React.useState(false);
  const [loginText, setLoginText] = React.useState("");
  const [isAuthError, setIsAuthError] = React.useState(false);

  const [RegisterMutation] = useMutation(REGISTER_MUTATION, {
    variables: {
      name: userName,
      password: userPassword,
      id: nanoid()
    },
    onError: () => {
      setLoginText(translations.registerTextError);
      setIsAuthError(true);
      setUserPassword("");
      setUserName("");
    },
    onCompleted: ({ register }) => {
      if (register && register.id) {
        setLoginText(translations.registerTextSuccess);
        setUserPassword("");
        setUserName("");
      }
    }
  });

  const [LoginMutation] = useMutation(LOGIN_MUTATION, {
    variables: {
      name: userName,
      password: userPassword
    },
    onError: () => {
      setLoginText(translations.loginTextError);
      setIsAuthError(true);
      setUserPassword("");
      setUserName("");
    },
    onCompleted: ({ login }) => {
      if (login && login.token && login.id) {
        setCredentials(login.token, login.id);
        setIsLogin(false);
        navigate(0);
      }
    }
  });

  useEffect(() => {
    if (loginText.length > 0) {
      setTimeout(() => {
        setLoginText("");
        setIsAuthError(false);
      }, 3000);
    }
  }, [loginText]);

  useEffect(() => {
    if (dataTranslations?.headerTranslations) {
      setTranslations(dataTranslations?.headerTranslations);
    }
  }, [dataTranslations]);

  useEffect(() => {
    if (currentLangError || langError) {
      setIsErrorShow(true);
    }
  }, [currentLangError, langError]);

  useEffect(() => {
    if (currentLang?.language.lang) {
      setLanguage(currentLang?.language.lang);
    }
  }, [currentLang?.language.lang]);

  useEffect(() => {
    if (
      choosenLang?.changeLanguage &&
      choosenLang?.changeLanguage.lang !== language
    ) {
      navigate(0);
    }
  }, [choosenLang?.changeLanguage, language, navigate]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAuth = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorAuthEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAuthClose = () => {
    setAnchorAuthEl(null);
  };

  const handleSelectLang = (selectedLang: string) => {
    if (language !== selectedLang) {
      setPreselectedLang(selectedLang);
      setOpen(true);
    }
    setAnchorEl(null);
  };

  const handleSingIn = () => {
    setAnchorAuthEl(null);
    setIsLogin(true);
  };

  const handleSingOut = () => {
    setAnchorAuthEl(null);
    removeCredentials();
    navigate("/");
    navigate(0);
  };

  const handleCloseReloadPageModal = () => {
    setPreselectedLang("");
    setOpen(false);
  };

  const handleReloadPage = () => {
    ChangeLanguage({ variables: { lang: preSelectedLang } });
  };

  const handleCloseErrorModal = () => {
    setIsErrorShow(false);
  };

  const handleCloseLoginPageModal = () => {
    setIsLogin(false);
    setIsUserNameError(false);
    setIsUserPasswordError(false);
    setUserName("");
    setUserPassword("");
  };

  const handleRegisterUser = () => {
    if (userName.length < 3) {
      setIsUserNameError(true);
      return;
    }

    const isPasswordError = validatePassword(userPassword);
    if (isPasswordError) {
      setIsUserPasswordError(true);
      return;
    }

    RegisterMutation({
      variables: {
        name: userName,
        password: userPassword,
        id: nanoid()
      }
    });
  };

  const handleLoginUser = () => {
    if (userName.length < 3) {
      setIsUserNameError(true);
      return;
    }

    const isPasswordError = validatePassword(userPassword);
    if (isPasswordError) {
      setIsUserPasswordError(true);
      return;
    }

    LoginMutation({
      variables: {
        name: userName,
        password: userPassword
      }
    });
  };

  const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    setIsUserNameError(false);
  };

  const handleChangeUserPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserPassword(event.target.value);
    setIsUserPasswordError(false);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: "20px" }}>
      <AppBar position="static">
        <Toolbar>
          <HeaderRouter
            isAuth={isAuth}
            dashboardLinkText={translations.dashboardLink}
            moviesLinkText={translations.moviesLink}
            randomMovieLinkText={translations.randomMovieLink}
            listsText={translations.lists}
          />
          <AuthSelector
            isAuth={isAuth}
            handleAuth={handleAuth}
            loginBtnText={translations.btnLogin}
            anchorAuthEl={anchorAuthEl}
            handleAuthClose={handleAuthClose}
            handleSingOut={handleSingOut}
            handleSingIn={handleSingIn}
            signOutText={translations.signOut}
            singInText={translations.singIn}
          />
          <LangSelector
            handleMenu={handleMenu}
            language={language}
            anchorEl={anchorEl}
            handleClose={handleClose}
            handleSelectLang={handleSelectLang}
            defaultLangText={translations.defaultLang}
            ruLangText={translations.ruLang}
          />
        </Toolbar>
      </AppBar>
      <ModalReloadPage
        open={open}
        onClose={handleCloseReloadPageModal}
        reloadPage={handleReloadPage}
        btnReloadPageText={translations.btnReloadPage}
      />
      <ModalErrorLang
        open={isErrorShow}
        onClose={handleCloseErrorModal}
        closeErrorModal={handleCloseErrorModal}
        errorMessageText={translations.errorMessage}
        closeBtnText={translations.btnClose}
      />
      <ModalAuth
        open={isLogin}
        onClose={handleCloseLoginPageModal}
        loginText={loginText}
        isAuthError={isAuthError}
        isUserNameError={isUserNameError}
        nameLabel={translations.name}
        userNameHelperText={translations.userNameHelperText}
        userName={userName}
        handleChangeUserName={handleChangeUserName}
        isUserPasswordError={isUserPasswordError}
        passwordLabel={translations.password}
        userPasswordHelperText={translations.userPasswordHelperText}
        userPassword={userPassword}
        handleChangeUserPassword={handleChangeUserPassword}
        handleLoginUser={handleLoginUser}
        loginToAccountBtnText={translations.loginToAccount}
        handleRegisterUser={handleRegisterUser}
        registerBtnText={translations.register}
      />
    </Box>
  );
};
