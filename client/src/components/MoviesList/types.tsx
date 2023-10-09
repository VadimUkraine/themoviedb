type Movie = {
  id: string;
  title: string;
  poster_path: string;
  release_date: string;
};

type MoviesListProps = {
  listTitle?: string;
  list: Movie[];
  btnDetailsText?: string;
  noImageText?: string;
};

export { MoviesListProps };
