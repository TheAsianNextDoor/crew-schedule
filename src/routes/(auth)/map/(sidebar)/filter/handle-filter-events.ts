import { goto } from '$app/navigation';
import { FILTER_KEYS } from './filter-funcs';
import type { EQUALITY_ENUM } from '../../../../../lib/constants/equality';
import queryString, { type ParsedQuery } from 'query-string';
import { setFilterQueryParams } from './filter-store';

const maybeFilterByValue = (
  shouldFilter: boolean,
  searchParamKey: (typeof FILTER_KEYS)[keyof typeof FILTER_KEYS],
  searchParamValue: string,
  searchParams: ParsedQuery,
) => {
  const baseUrl = '/map/filter?';

  if (shouldFilter) {
    searchParams[searchParamKey] = searchParamValue;
    setFilterQueryParams(searchParams);
    const queryParams = queryString.stringify(searchParams);
    goto(`${baseUrl}${queryParams}`);
  } else {
    delete searchParams[searchParamKey];
    setFilterQueryParams(searchParams);
    const queryParams = queryString.stringify(searchParams);
    goto(`${baseUrl}${queryParams}`);
  }
};

export const filterByDiscipline = (filterValue: string, searchParams: ParsedQuery) => {
  const shouldFilter = filterValue !== '';

  maybeFilterByValue(shouldFilter, FILTER_KEYS.phaseDiscipline, filterValue, searchParams);
};

export const filterByStatusName = (filterValue: string, searchParams: ParsedQuery) => {
  const shouldFilter = filterValue !== '';

  maybeFilterByValue(shouldFilter, FILTER_KEYS.phaseStatus, filterValue, searchParams);
};

export const filterByEstimatedCrewHours = (
  condition: (typeof EQUALITY_ENUM)[keyof typeof EQUALITY_ENUM],
  crewHours: number | undefined,
  searchParams: ParsedQuery,
) => {
  const hours = crewHours ?? 0;
  const shouldFilter = hours !== 0;
  const searchParamValue = JSON.stringify({
    condition,
    hours,
  });

  maybeFilterByValue(shouldFilter, FILTER_KEYS.phaseCrewHours, searchParamValue, searchParams);
};

export const filterByDateRange = (
  dateRange: { start?: Date; end?: Date },
  searchParams: ParsedQuery,
) => {
  const shouldFilter = !!(dateRange?.start && dateRange.end);

  maybeFilterByValue(
    shouldFilter,
    FILTER_KEYS.phaseStartDate,
    JSON.stringify(dateRange),
    searchParams,
  );
};

export const filterByForeman = (filterValue: string, searchParams: ParsedQuery) => {
  const shouldFilter = filterValue.length !== 0;

  maybeFilterByValue(shouldFilter, FILTER_KEYS.phaseForeman, filterValue, searchParams);
};
