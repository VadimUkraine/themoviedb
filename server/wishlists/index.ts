import { RESTDataSource } from "@apollo/datasource-rest";
import { List, ListMovie } from "../types/lists";
import inMemoryListsStore from "./store/in-memory-lists.store";
import { GraphQLError } from "graphql";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { isTokenValid } from "../helpers/isTokenValid";
import { AuthenticationError } from "../helpers/errors";

class WishListsAPI extends RESTDataSource {
  private token: string;

  constructor(options: { token: string; cache: KeyValueCache }) {
    super(options); // this sends our server's `cache` through
    this.token = options.token;
  }

  async createList(userId: string, id: string, name: string): Promise<List> {
    const isUserValid = isTokenValid(this.token);

    if (!isUserValid) throw AuthenticationError();

    const newList = inMemoryListsStore.createList(userId, id, name);

    if (!newList) {
      throw new GraphQLError("This List is exist");
    }

    return {
      ...newList
    };
  }

  async getUserLists(userId: string): Promise<List[]> {
    const isUserValid = isTokenValid(this.token);

    if (!isUserValid) throw AuthenticationError();

    return inMemoryListsStore.getUserLists(userId);
  }

  async addMovieToList(
    userId: string,
    movieId: string,
    movieTitle: string,
    posterPath: string,
    listId: string
  ): Promise<ListMovie> {
    const movie = inMemoryListsStore.addMovieToList(
      userId,
      movieId,
      movieTitle,
      posterPath,
      listId
    );

    if (!movie) {
      throw new GraphQLError("This Movie exists in the list");
    }

    return {
      ...movie
    };
  }

  async deleteList(listId: string): Promise<List> {
    return {
      ...inMemoryListsStore.deleteList(listId)
    };
  }

  async getUserMoviesList(listId: string): Promise<ListMovie[]> {
    const isUserValid = isTokenValid(this.token);

    if (!isUserValid) throw AuthenticationError();

    return inMemoryListsStore.getUserMoviesList(listId);
  }

  async removeUserMovie(listId: string, movieId: string): Promise<ListMovie> {
    return inMemoryListsStore.removeUserMovie(listId, movieId);
  }
}

export default WishListsAPI;
