type MovieListItem = {
  movieId: string;
  movieTitle: string;
  posterPath: string;
};

type MovieListCardProps = {
  movie: MovieListItem;
  movieQueue: number;
  btnText?: string;
  refetchUserMoviesList: () => void;
  noImageText?: string;
  listId: string;
  isLastMovieInList: boolean;
};

export { MovieListCardProps };
