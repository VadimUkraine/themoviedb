/* eslint-disable no-unused-vars */
import { Dayjs } from "dayjs";

type FiltersPanelProps = {
  selectedGenresIds: number[];
  handleToggleGenreId: (genreId: number) => void;
  dateFrom: Dayjs;
  dateTo: Dayjs;
  setDateFrom: (newValue: Dayjs) => void;
  setDateTo: (newValue: Dayjs) => void;
  handleApplyFilters: () => void;
  btnAppleText?: string;
  filtersReleaseDates?: string;
  filtersGenres?: string;
  filterFrom?: string;
  filtersTo?: string;
  genresErrorMessage?: string;
};

export { FiltersPanelProps };
