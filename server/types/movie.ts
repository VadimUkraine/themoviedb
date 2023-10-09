type Movie = {
  id: string;
  title: string;
  poster_path: string;
  release_date: string;
};

type MoviesList = {
  playing: [Movie];
  upcoming: [Movie];
  popular: [Movie];
};

type MovieDetailsById = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  tagline: string;
  backdrop_path: string;
  genres: [string];
  runtime: number;
};

type MovieCrew = {
  id: number;
  name: string;
  known_for_department: string;
  profile_path: string;
  job: string;
};

type Recommendations = {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
};

type MovieDetails = {
  details: MovieDetailsById;
  crew: [MovieCrew];
  recommendations: [Recommendations];
};

type FilteredMoviesList = {
  list: [Movie];
  totalPages: number;
};

type Genre = {
  id: number;
  name: string;
};

export {
  Movie,
  MoviesList,
  MovieDetails,
  FilteredMoviesList,
  Genre,
  MovieCrew,
  Recommendations
};
