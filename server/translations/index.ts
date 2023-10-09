import { RESTDataSource } from "@apollo/datasource-rest";
import {
  HeaderTranslations,
  DashboardTranslations,
  MoviesTranslations,
  RandomMovieTranslations,
  MovieDetailsTranslations,
  CreateListsTranslations,
  UserListsTranslations,
  UserMoviesListTranslations,
  NotFoundTranslations
} from "../types/translations";
import translationsStore from "./store/translations.store";
import inMemorySettingsStore from "../settings/store/in-memory-settings.store";

class TranslationsAPI extends RESTDataSource {
  async getHeaderTranslations(): Promise<HeaderTranslations> {
    const language = inMemorySettingsStore.getLang();

    return {
      ...translationsStore.getHeaderTranslations(language)
    };
  }

  async getDashboardTranslations(): Promise<DashboardTranslations> {
    const language = inMemorySettingsStore.getLang();

    return {
      ...translationsStore.getDashboardTranslations(language)
    };
  }

  async getMoviesTranslations(): Promise<MoviesTranslations> {
    const language = inMemorySettingsStore.getLang();

    return {
      ...translationsStore.getMoviesTranslations(language)
    };
  }

  async getRandomMovieTranslations(): Promise<RandomMovieTranslations> {
    const language = inMemorySettingsStore.getLang();

    return {
      ...translationsStore.getRandomMovieTranslations(language)
    };
  }

  async getMovieDetailsTranslations(): Promise<MovieDetailsTranslations> {
    const language = inMemorySettingsStore.getLang();

    return {
      ...translationsStore.getMovieDetailsTranslations(language)
    };
  }

  async getCreateListsTranslations(): Promise<CreateListsTranslations> {
    const language = inMemorySettingsStore.getLang();

    return {
      ...translationsStore.getCreateListsTranslations(language)
    };
  }

  async getUserListsTranslations(): Promise<UserMoviesListTranslations> {
    const language = inMemorySettingsStore.getLang();

    return {
      ...translationsStore.getUserListsTranslations(language)
    };
  }

  async getUserMoviesListTranslations(): Promise<UserListsTranslations> {
    const language = inMemorySettingsStore.getLang();

    return {
      ...translationsStore.getUserMoviesListTranslations(language)
    };
  }

  async getNotFoundTranslations(): Promise<NotFoundTranslations> {
    const language = inMemorySettingsStore.getLang();

    return {
      ...translationsStore.getNotFoundTranslations(language)
    };
  }
}

export default TranslationsAPI;
