import queryString from 'query-string';
import { getFilterQueryParams } from '../(sidebar)/filter/filter-store';
import { goto } from '$app/navigation';

export const navigateWithFilterSearchParams = (newUrl: string) => {
  const filterQueryParams = getFilterQueryParams();
  if (!Object.keys(filterQueryParams).length) {
    goto(newUrl);

    return;
  }

  const [pathname, currentSearchParams] = newUrl.split('?');
  const currentQueryParams = queryString.parse(currentSearchParams);
  const combinedQueryParams = { ...filterQueryParams, ...currentQueryParams };
  const newSearchParams = `?${queryString.stringify(combinedQueryParams)}`;
  goto(`${pathname}${newSearchParams}`);
};
