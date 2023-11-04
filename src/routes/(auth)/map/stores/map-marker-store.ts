import { get, writable } from 'svelte/store';
import type { HydratedMapSite, SiteLocation } from '../+page.server';
import {
  addMarkerToMap,
  removeMarkerFromMap,
  showAllMarkers,
  type Marker,
} from '../helpers/marker-utils';
import type { MapPhase } from '../queries/retrieve-phases-by-site';

export type HydratedMapMarker = {
  id: string;
  location: SiteLocation;
  marker: Marker;
};

/**
 * Base Hydrated Map Markers to have a baseline to filter from
 */
const baseHydratedMarkerStore = writable<HydratedMapMarker[]>([]);

export const addBaseHydratedMarker = (hydratedMarker: HydratedMapMarker) => {
  baseHydratedMarkerStore.update((mapMarkers) => {
    mapMarkers.push(hydratedMarker);
    return mapMarkers;
  });
};

export const getBaseHydratedMarkers = () => get(baseHydratedMarkerStore);

/**
 * Functions to filter the map
 */
export type FilterSiteConditionFunc = (site: HydratedMapSite) => boolean;
export type FilterPhaseConditionFunc = (phases: MapPhase) => boolean;
export type FilterType = 'site' | 'phase';
export type FilterConfig = {
  siteConditionFunc?: FilterSiteConditionFunc;
  phaseConditionFunc?: FilterPhaseConditionFunc;
  type: FilterType;
};
const filterConditionStore = writable<Record<string, FilterConfig>>({});

const getFilterConditionKeys = () => Object.keys(get(filterConditionStore));

const getFilterConditionFuncs = () => Object.values(get(filterConditionStore));

export const addFilterConditionFunc = (
  filterName: string,
  filterConditionFunc: FilterSiteConditionFunc | FilterPhaseConditionFunc,
  filterType: FilterType,
) => {
  filterConditionStore.update((store) => {
    if (filterType === 'site') {
      store[filterName] = {
        siteConditionFunc: filterConditionFunc as FilterSiteConditionFunc,
        type: filterType,
      };
    }

    if (filterType === 'phase') {
      store[filterName] = {
        phaseConditionFunc: filterConditionFunc as FilterPhaseConditionFunc,
        type: filterType,
      };
    }

    return store;
  });
};

export const removeFilterConditionFunc = (filterName: string) => {
  if (!getFilterConditionKeys().includes(filterName)) {
    return;
  }

  filterConditionStore.update((store) => {
    delete store[filterName];

    return store;
  });
};

export const clearFilterConditionFuncs = () => {
  filterConditionStore.set({});
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

const shouldShowMarker = (hydratedMarker: HydratedMapMarker) => {
  const conditionConfigs = getFilterConditionFuncs();

  const siteConfigs = conditionConfigs.filter(({ type }) => type === 'site');
  const phaseConfigs = conditionConfigs.filter(({ type }) => type === 'phase');

  const passesSiteConditions = siteConfigs.every(
    ({ siteConditionFunc }) => siteConditionFunc?.(hydratedMarker.location.content),
  );

  const passesPhaseConditions = hydratedMarker.location.content.phases.some((phase) =>
    phaseConfigs.every(({ phaseConditionFunc }) => phaseConditionFunc?.(phase)),
  );

  return passesSiteConditions && passesPhaseConditions;
};

export const filterMapMarkers = () => {
  if (getFilterConditionFuncs().length === 0) {
    filteredHydratedMarkerStore.set(getBaseHydratedMarkers());
    showAllMarkers();

    return;
  }

  getBaseHydratedMarkers().filter((hydratedMarker) => {
    if (shouldShowMarker(hydratedMarker)) {
      addMarkerToMap(hydratedMarker.marker);

      return true;
    }

    removeMarkerFromMap(hydratedMarker.marker);

    return false;
  });
};
