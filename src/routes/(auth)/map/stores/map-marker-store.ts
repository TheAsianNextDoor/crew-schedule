import { get, writable } from 'svelte/store';
import { showAllMarkers, type Marker } from '../helpers/marker-utils';
import type { GenericHydratedLocation } from '../+layout.server';

export type HydratedMapMarker = {
  id: string;
  location: GenericHydratedLocation;
  marker: Marker;
};

/**
 * Base Hydrated Map Markers to have a baseline to filter from
 */
export const baseHydratedMarkerStore = writable<HydratedMapMarker[]>([]);

export const addBaseHydratedMarker = (hydratedMarker: HydratedMapMarker) => {
  baseHydratedMarkerStore.update((mapMarkers) => {
    mapMarkers.push(hydratedMarker);
    return mapMarkers;
  });
};

export const getBaseHydratedMarkers = () => get(baseHydratedMarkerStore);
export const setBaseHydratedMarkers = (hydratedMarkers: HydratedMapMarker[]) =>
  baseHydratedMarkerStore.set(hydratedMarkers);

/**
 * Filtered Hydrated Map Markers
 */
const filteredHydratedMarkerStore = writable<HydratedMapMarker[]>([]);

export const clearFilteredHydratedMarkers = () => {
  showAllMarkers();
  filteredHydratedMarkerStore.set(getBaseHydratedMarkers());
};

export const setFilteredHydratedMarkers = (sites: HydratedMapMarker[]) => {
  filteredHydratedMarkerStore.set(sites);
};

/**
 * Selected Hydrated Map Marker
 */
/**
 * The selected map entity to display in the menu
 */
export const selectedHydratedMarkerStore = writable<HydratedMapMarker | null>(null);
export const { subscribe: selectedHydratedMarkerSubscribe } = selectedHydratedMarkerStore;
export const getSelectedHydratedMarker = () => get(selectedHydratedMarkerStore);
export const setSelectedHydratedMarker = (mapMarker: HydratedMapMarker | null) => {
  selectedHydratedMarkerStore.set(mapMarker);
};

export const updateSelectedHydratedMarkerLocation = (location: GenericHydratedLocation) => {
  selectedHydratedMarkerStore.update((val) => {
    if (val?.location) {
      val.location = location;
    }

    return val;
  });
};
