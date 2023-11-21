import queryString from 'query-string';
import { getFilterQueryParams } from '../filter/filter-store';
import { goto } from '$app/navigation';

export const navigateWithFilterSearchParams = (newUrl: string) => {
  const filterQueryParams = getFilterQueryParams();

  const [pathname, currentSearchParams] = newUrl.split('?');
  const currentQueryParams = queryString.parse(currentSearchParams);
  const combinedQueryParams = { ...filterQueryParams, ...currentQueryParams };
  const newSearchParams = `?${queryString.stringify(combinedQueryParams)}`;
  goto(`${pathname}${newSearchParams}`);
};

export const getSelectedLocationId = () =>
  new URL(location.href).searchParams.get('selected-location');

export const getSelectedLocationSearchParam = () =>
  getSelectedLocationId() ? `selected-location=${getSelectedLocationId()}` : '';
