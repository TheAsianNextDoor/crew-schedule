import { get, writable } from 'svelte/store';

import type { HydratedMapMarker } from './map-marker-store';
import type { HydratedLocation } from '../+page.server';

/**
 * The selected map entity to display in the menu
 */
export const selectedEntityStore = writable<HydratedMapMarker | null>(null);
export const { subscribe: selectedEntitySubscribe } = selectedEntityStore;
export const getSelectedEntity = () => get(selectedEntityStore);
export const setSelectedEntity = (mapMarker: HydratedMapMarker | null) => {
  selectedEntityStore.set(mapMarker);
};
export const updateSelectedLocation = (location: HydratedLocation) => {
  selectedEntityStore.update((val) => {
    if (val?.location) {
      val.location = location;
    }

    return val;
  });
};

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
