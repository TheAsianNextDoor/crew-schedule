import { showMapFilter } from '../../stores/filter-store';
import { showMapSidebar } from '../sidebar-store';

export const load = async () => {
  showMapFilter();
  showMapSidebar();
};
