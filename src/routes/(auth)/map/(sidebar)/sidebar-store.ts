import { get, writable } from 'svelte/store';

/**
 * Map sidebar store
 */
export const isMapSidebarVisibleStore = writable(false);

export const isMapSidebarVisible = () => get(isMapSidebarVisibleStore);
export const hideMapSidebar = () => {
  isMapSidebarVisibleStore.set(false);
};
export const showMapSidebar = () => {
  isMapSidebarVisibleStore.set(true);
};
