type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  tagline: string;
  backdrop_path: string;
  genres: string[];
  runtime: number;
};

type MovieCardDetailsProps = {
  movie: Movie;
  overviewText: string;
  noImageText: string;
  hourReductionText: string;
  minuteReductionText: string;
};

export { MovieCardDetailsProps };
