/* eslint-disable no-unused-vars */
type GenresFilterProps = {
  selectedGenresIds: number[];
  handleToggleGenreId: (genreId: number) => void;
  filtersGenresText?: string;
  genresErrorMessage?: string;
};

export { GenresFilterProps };
