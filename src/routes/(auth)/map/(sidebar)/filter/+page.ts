import queryString from 'query-string';
import { showMapFilter } from './filter-store';
import { showMapSidebar } from '../sidebar-store';
import { filterFuncs } from './filter-funcs';
import { getProperty } from 'dot-prop';
import {
  getBaseHydratedMarkers,
  setFilteredHydratedMarkers,
  type HydratedMapMarker,
  baseHydratedMarkerStore,
} from '../../stores/map-marker-store';
import { addMarkerToMap, removeMarkerFromMap, showAllMarkers } from '../../helpers/marker-utils';
import type { HydratedMapPhase, HydratedMapSite } from '../../+layout.server';
import { LOCATION_TYPES_ENUM } from '$lib/constants/location-types';

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

export const ssr = false;
export const load = async ({ url }) => {
  showMapFilter();
  showMapSidebar();

  const { searchParams } = url;
  const queryParams = queryString.parse(searchParams.toString());

  if (Object.keys(queryParams).length === 0) {
    setFilteredHydratedMarkers(getBaseHydratedMarkers());
    showAllMarkers();

    return;
  }

  const filterConfigs: FilterConfigs = [];

  for (const param in queryParams) {
    const type = param.split('.')[0] as FilterType;
    const value = queryParams[param] as string;
    filterConfigs.push({
      type,
      func: getProperty(filterFuncs, param),
      value: isStringifiedObject(value) ? JSON.parse(value) : value,
    });
  }

  baseHydratedMarkerStore.subscribe((val) => {
    if (val.length === 0) {
      return;
    }

    const filteredMarkers = getBaseHydratedMarkers().filter((hydratedMarker) => {
      if (shouldShowMarker(hydratedMarker, filterConfigs)) {
        addMarkerToMap(hydratedMarker.marker);

        return true;
      }

      removeMarkerFromMap(hydratedMarker.marker);

      return false;
    });

    setFilteredHydratedMarkers(filteredMarkers);
  });

  return { fields: queryParams };
};
