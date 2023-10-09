type HeaderTranslationsProps = {
  dashboardLink?: string;
  moviesLink?: string;
  randomMovieLink?: string;
  btnLogin?: string;
  defaultLang?: string;
  ruLang?: string;
  btnReloadPage?: string;
  btnClose?: string;
  errorMessage?: string;
  singIn?: string;
  signOut?: string;
  name?: string;
  password?: string;
  loginToAccount?: string;
  register?: string;
  userNameHelperText?: string;
  userPasswordHelperText?: string;
  registerTextSuccess?: string;
  registerTextError?: string;
  loginTextError?: string;
  lists?: string;
};

type HeaderProps = {
  isAuth: boolean;
};

export { HeaderTranslationsProps, HeaderProps };
