import queryString from 'query-string';
import { showMapSidebar } from '../sidebar-store.js';
import { showMapFilter } from './filter-store.js';
import { filterMarkers } from './filter-markers.js';

export const ssr = false;
export const load = async ({ url }) => {
  showMapFilter();
  showMapSidebar();

  const { searchParams } = url;
  const queryParams = queryString.parse(searchParams.toString());

  filterMarkers(url);

  return { fields: queryParams };
};
