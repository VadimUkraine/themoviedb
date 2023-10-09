type UserMoviesListTranslationsProps = {
  errorMessage?: string;
  noData?: string;
  delete?: string;
  noImage?: string;
};

type MovieListItem = {
  movieId: string;
  movieTitle: string;
  posterPath: string;
};

export { UserMoviesListTranslationsProps, MovieListItem };
