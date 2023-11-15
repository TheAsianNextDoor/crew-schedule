import { showMapSidebar } from '../../sidebar-store';

export const load = async ({ data }) => {
  showMapSidebar();

  return data;
};
