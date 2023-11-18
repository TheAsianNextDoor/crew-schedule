import type { ParsedQuery } from 'query-string';
import { get, writable } from 'svelte/store';

/**
 * Map filter visibility
 */
export const isMapFilterVisibleStore = writable(false);
const { set } = isMapFilterVisibleStore;

export const isMapFilterVisible = () => get(isMapFilterVisibleStore);

export const hideMapFilter = () => {
  set(false);
};
export const showMapFilter = () => {
  set(true);
};

export const toggleMapFilter = () => {
  isMapFilterVisibleStore.update((value) => !value);
};

export const filterQueryParamsStore = writable<ParsedQuery>({});
export const getFilterQueryParams = () => get(filterQueryParamsStore);
export const setFilterQueryParams = (queryParams: ParsedQuery) => {
  filterQueryParamsStore.set(queryParams);
};
export const addFilterQueryParam = (param: Record<string, string>) => {
  const [key, value] = Object.entries(param)[0];
  filterQueryParamsStore.update((val) => {
    val[key] = value;

    return val;
  });
};
export const clearFilterQueryParams = () => filterQueryParamsStore.set({});
