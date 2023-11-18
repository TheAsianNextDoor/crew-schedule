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
export const updateBaseHydratedLocations = (hydratedLocations: GenericHydratedLocation[]) => {
  baseHydratedMarkerStore.update((val) => {
    val.forEach((hydratedMarker, idx) => {
      hydratedMarker.location = hydratedLocations[idx];
    });

    return val;
  });
};

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
