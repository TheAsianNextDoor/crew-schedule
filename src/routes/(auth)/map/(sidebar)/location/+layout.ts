import { hideMapFilter } from '../filter/filter-store.js';
import { showMapSidebar } from '../sidebar-store.js';

export const ssr = false;

export const load = async ({ data }) => {
  hideMapFilter();
  showMapSidebar();

  return data;
};
