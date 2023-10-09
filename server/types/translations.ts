type HeaderTranslations = {
  dashboardLink: string;
  moviesLink: string;
  randomMovieLink: string;
  btnLogin: string;
  defaultLang: string;
  ruLang: string;
  btnReloadPage: string;
  btnClose: string;
  errorMessage: string;
  singIn: string;
  signOut: string;
  name: string;
  password: string;
  loginToAccount: string;
  register: string;
  userNameHelperText: string;
  userPasswordHelperText: string;
  registerTextSuccess: string;
  registerTextError: string;
  loginTextError: string;
  lists: string;
};

type DashboardTranslations = {
  nowPlaying: string;
  upcoming: string;
  popular: string;
  btnDetails: string;
  noImage: string;
  errorMessage: string;
  noData: string;
};

type MoviesTranslations = {
  btnDetails: string;
  noImage: string;
  btnApply: string;
  filtersReleaseDates: string;
  filtersGenres: string;
  filterFrom: string;
  filtersTo: string;
  errorMessage: string;
  noData: string;
  genresErrorMessage: string;
};

type RandomMovieTranslations = {
  btnDetails: string;
  noImage: string;
  btnApply: string;
  filtersReleaseDates: string;
  filtersGenres: string;
  filterFrom: string;
  filtersTo: string;
  errorMessage: string;
  noData: string;
  genresErrorMessage: string;
};

type MovieDetailsTranslations = {
  overview: string;
  crew: string;
  recommendations: string;
  hour: string;
  minute: string;
  noImage: string;
  errorMessage: string;
};

type CreateListsTranslations = {
  errorListExist: string;
  listCreated: string;
  createNewList: string;
  nameOfNewList: string;
  create: string;
  addToOneOfYourLists: string;
  errorMovieExist: string;
  movieWasAdded: string;
};

type UserListsTranslations = {
  errorListExist: string;
  listCreated: string;
  nameOfNewList: string;
  create: string;
  createList: string;
  errorMessage: string;
  noData: string;
  myLists: string;
  delete: string;
  item: string;
  items: string;
};

type UserMoviesListTranslations = {
  errorMessage: string;
  noData: string;
  delete: string;
  noImage: string;
};

type NotFoundTranslations = {
  notFound: string;
};

export {
  HeaderTranslations,
  DashboardTranslations,
  MoviesTranslations,
  RandomMovieTranslations,
  MovieDetailsTranslations,
  CreateListsTranslations,
  UserListsTranslations,
  UserMoviesListTranslations,
  NotFoundTranslations
};
