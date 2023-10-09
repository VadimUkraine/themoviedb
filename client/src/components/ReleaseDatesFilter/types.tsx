/* eslint-disable no-unused-vars */
import { Dayjs } from "dayjs";

type ReleaseDatesFilterProps = {
  dateFrom: Dayjs;
  dateTo: Dayjs;
  setDateFrom: (newValue: Dayjs) => void;
  setDateTo: (newValue: Dayjs) => void;
  filtersReleaseDatesText?: string;
  filterFromText?: string;
  filtersToText?: string;
};

export { ReleaseDatesFilterProps };
