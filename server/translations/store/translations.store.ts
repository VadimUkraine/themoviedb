import { translations } from "./translations";

const translationsStore = {
  getHeaderTranslations: (lang: string) => {
    return translations.header[lang];
  },

  getDashboardTranslations: (lang: string) => {
    return translations.dashboard[lang];
  },

  getMoviesTranslations: (lang: string) => {
    return translations.movies[lang];
  },

  getRandomMovieTranslations: (lang: string) => {
    return translations.randomMovie[lang];
  },

  getMovieDetailsTranslations: (lang: string) => {
    return translations.movieDetails[lang];
  },

  getCreateListsTranslations: (lang: string) => {
    return translations.createLists[lang];
  },

  getUserListsTranslations: (lang: string) => {
    return translations.userListsTranslations[lang];
  },

  getUserMoviesListTranslations: (lang: string) => {
    return translations.userMoviesListTranslations[lang];
  },

  getNotFoundTranslations: (lang: string) => {
    return translations.notFoundTranslations[lang];
  }
};

export default translationsStore;
