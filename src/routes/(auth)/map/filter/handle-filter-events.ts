import { goto } from '$app/navigation';
import { FILTER_KEYS } from './filter-funcs';
import type { EQUALITY_ENUM } from '../../../../lib/constants/equality';
import { setFilterQueryParams } from './filter-store';
import queryString from 'query-string';

const maybeFilterByValue = (
  shouldFilter: boolean,
  searchParamKey: (typeof FILTER_KEYS)[keyof typeof FILTER_KEYS],
  searchParamValue: string,
) => {
  const baseUrl = '/map?';
  const parsedQuery = queryString.parse(location.search);

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

export const filterPhaseByDiscipline = ({ target }: Event) => {
  const parsedQuery = queryString.parse(location.search);
  const currentDisciplines = (parsedQuery[FILTER_KEYS.phaseDiscipline] as string) || '';
  let disciplineArray = currentDisciplines.length ? currentDisciplines.split(',') : [];
  const { value, checked } = target as HTMLInputElement;
  if (checked) {
    disciplineArray.push(value);
  } else {
    disciplineArray = disciplineArray.filter((val) => val !== value);
  }

  const shouldFilter = disciplineArray.length !== 0;
  const filterValue = disciplineArray.join(',');
  maybeFilterByValue(shouldFilter, FILTER_KEYS.phaseDiscipline, filterValue);
};

export const filterPhaseByStatusName = (event: Event) => {
  const { value } = event.target as HTMLSelectElement;
  const shouldFilter = value !== '';

  maybeFilterByValue(shouldFilter, FILTER_KEYS.phaseStatus, value);
};

export const filterPhaseByEstimatedCrewHours = (
  condition: (typeof EQUALITY_ENUM)[keyof typeof EQUALITY_ENUM],
  crewHours: string | undefined,
) => {
  const hours = Number(crewHours) ?? 0;
  const shouldFilter = hours !== 0;
  const searchParamValue = JSON.stringify({
    condition,
    hours,
  });

  maybeFilterByValue(shouldFilter, FILTER_KEYS.phaseCrewHours, searchParamValue);
};

export const filterPhaseByDateRange = (dateRange: { start?: Date; end?: Date }) => {
  const shouldFilter = !!(dateRange?.start && dateRange.end);

  maybeFilterByValue(shouldFilter, FILTER_KEYS.phaseStartDate, JSON.stringify(dateRange));
};

export const filterPhaseByForeman = (filterValue: string) => {
  const shouldFilter = filterValue.length !== 0;

  maybeFilterByValue(shouldFilter, FILTER_KEYS.phaseForeman, filterValue);
};

export const filterSiteByStatusName = (event: Event) => {
  const { value } = event.target as HTMLSelectElement;
  const shouldFilter = value !== '';

  maybeFilterByValue(shouldFilter, FILTER_KEYS.siteStatus, value);
};

export const filterSiteByClientName = (filterValue: string) => {
  const shouldFilter = filterValue !== '';

  maybeFilterByValue(shouldFilter, FILTER_KEYS.siteClient, filterValue);
};
