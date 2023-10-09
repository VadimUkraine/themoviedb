import { List, ListMovie } from "../../types/lists";

const inMemoryListsStore = {
  lists: [],

  createList: (userId: string, id: string, name: string): List => {
    const userLists = inMemoryListsStore.lists.find(
      (item) => item.userId === userId && item.name === name
    );

    if (!userLists) {
      inMemoryListsStore.lists.push({ userId, id, name, movies: [] });
    } else {
      return null;
    }

    return { id, name };
  },

  getUserLists: (userId: string): List[] => {
    return inMemoryListsStore.lists
      .filter((item) => item.userId === userId)
      .map((el) => ({
        ...el,
        quantity: el.movies.length
      }));
  },

  addMovieToList: (
    userId: string,
    movieId: string,
    movieTitle: string,
    posterPath: string,
    listId: string
  ): ListMovie => {
    const userListIndex = inMemoryListsStore.lists.findIndex(
      (item) => item.userId === userId && item.id === listId
    );
    const isMovieExist = inMemoryListsStore.lists[userListIndex].movies.some(
      (item: ListMovie) => item.movieId === movieId
    );

    if (isMovieExist) {
      return null;
    }

    inMemoryListsStore.lists[userListIndex].movies.push({
      movieId,
      movieTitle,
      posterPath
    });

    return {
      movieId,
      movieTitle,
      posterPath
    };
  },

  deleteList: (listId: string): List => {
    const userList = inMemoryListsStore.lists.find(
      (item) => item.id === listId
    );

    inMemoryListsStore.lists = inMemoryListsStore.lists.filter(
      (item) => item.id !== listId
    );

    return { ...userList };
  },

  getUserMoviesList: (listId: string): ListMovie[] => {
    return inMemoryListsStore.lists.find((item) => item.id === listId).movies;
  },

  removeUserMovie: (listId: string, movieId: string): ListMovie => {
    const listIndex = inMemoryListsStore.lists.findIndex(
      (item) => item.id === listId
    );

    inMemoryListsStore.lists[listIndex].movies = inMemoryListsStore.lists[
      listIndex
    ].movies.filter((item: ListMovie) => item.movieId !== movieId);

    return { movieId };
  }
};

export default inMemoryListsStore;
