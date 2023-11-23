import type { ParsedQuery } from 'query-string';
import type { HydratedMapPhase, HydratedMapSite } from '../+layout.server';
import {
  setFilteredHydratedMarkers,
  type HydratedMapMarker,
  getBaseHydratedMarkers,
} from '../stores/map-marker-store';
import { LOCATION_TYPES_ENUM } from '$lib/constants/location-types';
import { addMarkerToMap, removeMarkerFromMap, showAllMarkers } from '../helpers/marker-utils';
import { getProperty } from 'dot-prop';
import { FILTER_FUNCTIONS } from './filter-funcs';

export type FilterSiteConditionFunc = (
  site: HydratedMapSite,
  value: string | Record<string, unknown>,
) => boolean;
export type FilterPhaseConditionFunc = (
  phases: HydratedMapPhase,
  value: string | Record<string, unknown>,
) => boolean;
export type FilterType = 'site' | 'phase';
export type FilterConfigs<T = FilterSiteConditionFunc | FilterPhaseConditionFunc> = {
  type: FilterType;
  func: T;
  value: string | Record<string, unknown>;
}[];

const shouldShowMarker = (hydratedMarker: HydratedMapMarker, filterConfigs: FilterConfigs) => {
  if (hydratedMarker.location.type === LOCATION_TYPES_ENUM.mobilizationHub) {
    return true;
  }

  const hydratedMapSite = hydratedMarker.location.content as HydratedMapSite;

  const siteConfigs = filterConfigs.filter(
    ({ type }) => type === 'site',
  ) as FilterConfigs<FilterSiteConditionFunc>;
  const phaseConfigs = filterConfigs.filter(
    ({ type }) => type === 'phase',
  ) as FilterConfigs<FilterPhaseConditionFunc>;

  const passesSiteConditions = siteConfigs.every(
    ({ func, value }) => func?.(hydratedMapSite, value),
  );

  const passesPhaseConditions = hydratedMapSite.phases.some((phase) =>
    phaseConfigs.every(({ func, value }) => func?.(phase, value)),
  );

  return passesSiteConditions && passesPhaseConditions;
};

const isStringifiedObject = (str: string | null) => {
  try {
    JSON.parse(str || '');
    return true;
  } catch (e) {
    return false;
  }
};

export const filterMarkers = (filterQueryParams: ParsedQuery) => {
  const baseHydratedMarkers = getBaseHydratedMarkers();

  if (baseHydratedMarkers.length === 0) {
    return;
  }

  if (Object.keys(filterQueryParams).length === 0) {
    setFilteredHydratedMarkers(baseHydratedMarkers);
    showAllMarkers();

    return;
  }

  const filterConfigs: FilterConfigs = [];

  for (const param in filterQueryParams) {
    const type = param.split('.')[0] as FilterType;
    const value = filterQueryParams[param] as string;
    filterConfigs.push({
      type,
      func: getProperty(FILTER_FUNCTIONS, param),
      value: isStringifiedObject(value) ? JSON.parse(value) : value,
    });
  }

  const filteredMarkers = baseHydratedMarkers.filter((hydratedMarker) => {
    if (shouldShowMarker(hydratedMarker, filterConfigs)) {
      addMarkerToMap(hydratedMarker.marker);

      return true;
    }

    removeMarkerFromMap(hydratedMarker.marker);

    return false;
  });

  setFilteredHydratedMarkers(filteredMarkers);
};
