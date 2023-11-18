import { get, writable } from 'svelte/store';
import type { HydratedMapMarker } from './map-marker-store';
import type { GenericHydratedLocation } from '../+layout.server';

/**
 * The selected map entity to display in the menu
 */
export const selectedEntityStore = writable<HydratedMapMarker | null>(null);
export const { subscribe: selectedEntitySubscribe } = selectedEntityStore;
export const getSelectedEntity = () => get(selectedEntityStore);
export const setSelectedEntity = (mapMarker: HydratedMapMarker | null) => {
  selectedEntityStore.set(mapMarker);
};
export const updateSelectedLocation = (location: GenericHydratedLocation) => {
  selectedEntityStore.update((val) => {
    if (val?.location) {
      val.location = location;
    }

    return val;
  });
};
