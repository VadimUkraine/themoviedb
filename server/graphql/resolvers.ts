// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
  Query: {
    moviesLists: async (_, __, { dataSources }) => {
      return dataSources.moviesAPI.getMoviesLists();
    },
    movieById: async (_, { id }, { dataSources }) => {
      return dataSources.moviesAPI.getMovie(id);
    },
    filteredMoviesList: async (
      _,
      { page, with_genres, dateFrom, dateTo },
      { dataSources }
    ) => {
      return dataSources.moviesAPI.getFilteredMovies(
        page,
        with_genres,
        dateFrom,
        dateTo
      );
    },
    filtersGenresList: async (_, __, { dataSources }) => {
      return dataSources.moviesAPI.getFiltersGenres();
    },
    randomMovie: async (
      _,
      { page, with_genres, dateFrom, dateTo },
      { dataSources }
    ) => {
      return dataSources.moviesAPI.getRandomMovie(
        page,
        with_genres,
        dateFrom,
        dateTo
      );
    },
    language: async (_, __, { dataSources }) => {
      return dataSources.settingsAPI.getLanguage();
    },
    headerTranslations: async (_, __, { dataSources }) => {
      return dataSources.translationsAPI.getHeaderTranslations();
    },
    dashboardTranslations: async (_, __, { dataSources }) => {
      return dataSources.translationsAPI.getDashboardTranslations();
    },
    moviesTranslations: async (_, __, { dataSources }) => {
      return dataSources.translationsAPI.getMoviesTranslations();
    },
    randomMovieTranslations: async (_, __, { dataSources }) => {
      return dataSources.translationsAPI.getRandomMovieTranslations();
    },
    movieDetailsTranslations: async (_, __, { dataSources }) => {
      return dataSources.translationsAPI.getMovieDetailsTranslations();
    },
    createListsTranslations: async (_, __, { dataSources }) => {
      return dataSources.translationsAPI.getCreateListsTranslations();
    },
    userLists: async (_, { userId }, { dataSources }) => {
      return dataSources.wishListsAPI.getUserLists(userId);
    },
    userListsTranslations: async (_, __, { dataSources }) => {
      return dataSources.translationsAPI.getUserListsTranslations();
    },
    userMoviesList: async (_, { listId }, { dataSources }) => {
      return dataSources.wishListsAPI.getUserMoviesList(listId);
    },
    userMoviesListTranslations: async (_, __, { dataSources }) => {
      return dataSources.translationsAPI.getUserMoviesListTranslations();
    },
    notFoundTranslations: async (_, __, { dataSources }) => {
      return dataSources.translationsAPI.getNotFoundTranslations();
    }
  },
  Mutation: {
    changeLanguage: async (_, { lang }, { dataSources }) => {
      return dataSources.settingsAPI.changeLanguage(lang);
    },
    register: async (_, { name, password, id }, { dataSources }) => {
      return dataSources.personalizationAPI.register(name, password, id);
    },
    login: async (_, { name, password }, { dataSources }) => {
      return dataSources.personalizationAPI.login(name, password);
    },
    createList: async (_, { userId, id, name }, { dataSources }) => {
      return dataSources.wishListsAPI.createList(userId, id, name);
    },
    addMovieToList: async (
      _,
      { userId, movieId, movieTitle, posterPath, listId },
      { dataSources }
    ) => {
      return dataSources.wishListsAPI.addMovieToList(
        userId,
        movieId,
        movieTitle,
        posterPath,
        listId
      );
    },
    deleteList: async (_, { listId }, { dataSources }) => {
      return dataSources.wishListsAPI.deleteList(listId);
    },
    removeUserMovie: async (_, { listId, movieId }, { dataSources }) => {
      return dataSources.wishListsAPI.removeUserMovie(listId, movieId);
    }
  }
};
