import { goto } from '$app/navigation';
import { FILTER_KEYS } from './filter-funcs';
import type { EQUALITY_ENUM } from '../../../../../lib/constants/equality';
import queryString from 'query-string';
import { setFilterQueryParams } from './filter-store';

const maybeFilterByValue = (
  shouldFilter: boolean,
  searchParamKey: (typeof FILTER_KEYS)[keyof typeof FILTER_KEYS],
  searchParamValue: string,
) => {
  const baseUrl = '/map/filter?';
  const parsedQuery = queryString.parse(window.location.search);

  if (shouldFilter) {
    parsedQuery[searchParamKey] = searchParamValue;
    setFilterQueryParams(parsedQuery);
    const queryParams = queryString.stringify(parsedQuery);
    goto(`${baseUrl}${queryParams}`, { keepFocus: true });
  } else {
    delete parsedQuery[searchParamKey];
    setFilterQueryParams(parsedQuery);
    const queryParams = queryString.stringify(parsedQuery);
    goto(`${baseUrl}${queryParams}`, { keepFocus: true });
  }
};

export const filterByDiscipline = (filterValue: string) => {
  const shouldFilter = filterValue !== '';

  maybeFilterByValue(shouldFilter, FILTER_KEYS.phaseDiscipline, filterValue);
};

export const filterByStatusName = (filterValue: string) => {
  const shouldFilter = filterValue !== '';

  maybeFilterByValue(shouldFilter, FILTER_KEYS.phaseStatus, filterValue);
};

export const filterByEstimatedCrewHours = (
  condition: (typeof EQUALITY_ENUM)[keyof typeof EQUALITY_ENUM],
  crewHours: number | undefined,
) => {
  const hours = crewHours ?? 0;
  const shouldFilter = hours !== 0;
  const searchParamValue = JSON.stringify({
    condition,
    hours,
  });

  maybeFilterByValue(shouldFilter, FILTER_KEYS.phaseCrewHours, searchParamValue);
};

export const filterByDateRange = (dateRange: { start?: Date; end?: Date }) => {
  const shouldFilter = !!(dateRange?.start && dateRange.end);

  maybeFilterByValue(shouldFilter, FILTER_KEYS.phaseStartDate, JSON.stringify(dateRange));
};

export const filterByForeman = (filterValue: string) => {
  const shouldFilter = filterValue.length !== 0;

  maybeFilterByValue(shouldFilter, FILTER_KEYS.phaseForeman, filterValue);
};
