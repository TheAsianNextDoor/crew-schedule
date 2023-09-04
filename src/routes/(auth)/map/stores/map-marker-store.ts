import { get, writable } from 'svelte/store';
import type { HydratedSite } from '../+page.server';
import type { Marker } from 'leaflet';
import { getMap } from './map-store';
import { addMarkerToMap, removeMarkerFromMap, showAllMarkers } from '../helpers/marker-utils';

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
 * Functions to filter the map
 */
export type FilterConditionFunc = (hydratedMapMarker: HydratedMapMarker) => boolean;
const filterConditionStore = writable<Record<string, FilterConditionFunc>>({});
const { subscribe: filterConditionSubscribe } = filterConditionStore;

const getFilterConditionKeys = () => Object.keys(get(filterConditionStore));

const getFilterConditionFuncs = () => Object.values(get(filterConditionStore));

const addFilterConditionFunc = (filterName: string, filterFunc: FilterConditionFunc) => {
  filterConditionStore.update((store) => {
    store[filterName] = filterFunc;

    return store;
  });
};

const removeFilterConditionFunc = (filterName: string) => {
  if (!getFilterConditionKeys().includes(filterName)) {
    return;
  }

  filterConditionStore.update((store) => {
    delete store[filterName];

    return store;
  });
};

const clearFilterConditionFuncs = () => {
  filterConditionStore.set({});
};

export {
  filterConditionSubscribe,
  addFilterConditionFunc,
  removeFilterConditionFunc,
  clearFilterConditionFuncs,
};

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

const filterMapMarkers = () => {
  if (getFilterConditionFuncs().length === 0) {
    filteredHydratedMarkerStore.set(getBaseHydratedMarkers());
    showAllMarkers();

    return;
  }

  getBaseHydratedMarkers().filter((hydratedMarker) => {
    if (getFilterConditionFuncs().every((conditionFunc) => conditionFunc(hydratedMarker))) {
      addMarkerToMap(hydratedMarker.marker);

      return true;
    }

    removeMarkerFromMap(hydratedMarker.marker);

    return false;
  });
};

export {
  filteredMapMarkerSubscribe,
  clearFilteredHydratedMarkers,
  setFilteredHydratedMarkers,
  filterMapMarkers,
};
