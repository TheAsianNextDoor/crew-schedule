import { showMapSidebar } from '../../sidebar-store';

export const ssr = false;

export const load = async ({ data }) => {
  showMapSidebar();

  return data;
};
