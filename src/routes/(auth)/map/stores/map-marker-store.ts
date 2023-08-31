import { get, writable } from 'svelte/store';
import type { HydratedSite } from '../+page.server';
import type { Marker } from 'leaflet';
import { getMap } from './map-store';
import { showAllMarkers } from '../helpers/marker-utils';

export type HydratedMapMarker = {
  site: HydratedSite;
  marker: Marker;
};

/**
 * Base Hydrated Map Markers to have a baseline to filter from
 */
const baseHydratedMarkerStore = writable<HydratedMapMarker[]>([]);
const { subscribe: mapSiteSubscribe } = baseHydratedMarkerStore;

const addBaseHydratedMarker = (hydratedMarker: HydratedMapMarker) => {
  baseHydratedMarkerStore.update((mapMarkers) => {
    mapMarkers.push(hydratedMarker);
    return mapMarkers;
  });
};

const getBaseHydratedMarkers = () => get(baseHydratedMarkerStore);

export { mapSiteSubscribe, addBaseHydratedMarker, getBaseHydratedMarkers };

/**
 * Filtered Hydrated Map Markers
 */
const filteredHydratedMarkerStore = writable<HydratedMapMarker[]>([]);
const { subscribe: filteredMapMarkerSubscribe } = filteredHydratedMarkerStore;

const clearFilteredHydratedMarkers = () => {
  getBaseHydratedMarkers().forEach(({ marker }) => marker.addTo(getMap()));
  filteredHydratedMarkerStore.set(getBaseHydratedMarkers());
};

const setFilteredHydratedMarkers = (sites: HydratedMapMarker[]) => {
  filteredHydratedMarkerStore.set(sites);
};

const filterByForeman = (foremanName: string) => {
  if (!foremanName) {
    filteredHydratedMarkerStore.set(getBaseHydratedMarkers());
    showAllMarkers();
    return;
  }

  filteredHydratedMarkerStore.set(
    getBaseHydratedMarkers().filter(({ marker, site }) => {
      if (site.currentPhase?.foreman_name.includes(foremanName)) {
        marker.addTo(getMap());
        return true;
      }
      marker.remove();
      return false;
    }),
  );
};

export {
  filteredMapMarkerSubscribe,
  clearFilteredHydratedMarkers,
  setFilteredHydratedMarkers,
  filterByForeman,
};
