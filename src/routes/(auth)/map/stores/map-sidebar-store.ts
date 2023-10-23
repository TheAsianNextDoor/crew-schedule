import { get, writable } from 'svelte/store';

import type { HydratedMapMarker } from './map-marker-store';

/**
 * The selected map entity to display in the menu
 */
export const selectedEntityStore = writable<HydratedMapMarker | null>(null);
const { subscribe: selectedEntitySubscribe } = selectedEntityStore;
const getSelectedEntity = () => get(selectedEntityStore);
const setSelectedEntity = (mapMarker: HydratedMapMarker | null) => {
  selectedEntityStore.set(mapMarker);
};

export { selectedEntitySubscribe, getSelectedEntity, setSelectedEntity };

/**
 * Map sidebar store
 */
export const isMapSidebarVisibleStore = writable(false);

const isMapSidebarVisible = () => get(isMapSidebarVisibleStore);
const hideMapSidebar = () => {
  isMapSidebarVisibleStore.set(false);
};
const showMapSidebar = () => {
  isMapSidebarVisibleStore.set(true);
};

export { isMapSidebarVisible, hideMapSidebar, showMapSidebar };
