type List = {
  id: string;
  name: string;
  userId?: string;
  movies?: ListMovie[];
  quantity?: number;
};

type ListMovie = {
  movieId: string;
  movieTitle?: string;
  posterPath?: string;
};

export { List, ListMovie };
