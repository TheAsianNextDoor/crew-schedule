import { derived, get, writable } from 'svelte/store';
import { getBaseHydratedMarkers, type HydratedMapMarker } from './map-marker-store';
import { MARKER_PINS, changeMarkerPin } from '../helpers/marker-pin-utils';
import type { Leg } from '../helpers/polyline-utils';

export const routeSitesStore = writable<HydratedMapMarker[]>([]);

export const getRouteSites = () => get(routeSitesStore);
export const setRouteSites = (items: HydratedMapMarker[]) => routeSitesStore.set(items);
export const clearRouteSites = () => routeSitesStore.set([]);

export const addToRouteSites = (items: HydratedMapMarker) => {
  routeSitesStore.update((val) => {
    val.push(items);

    return val;
  });
};

export const changePinsToRoutes = () => {
  const mapRoutes = getRouteSites();
  const nonMapRouteIcons = getBaseHydratedMarkers().filter((mapMarker) => {
    const index = mapRoutes.findIndex(({ id }) => mapMarker.id === id);

    return index === -1 ? true : false;
  });

  nonMapRouteIcons.forEach(({ marker }) => changeMarkerPin(marker, MARKER_PINS.default));
  mapRoutes.forEach(({ marker }) => changeMarkerPin(marker, MARKER_PINS.routes));
};

/**
 * Derived value for max items
 */
export const isMaxRouteItemsStore = derived([routeSitesStore], ([$mapRoutesStore]) => {
  return $mapRoutesStore.length >= 10;
});

/**
 * Route Legs
 */
export const routeLegs = writable<Leg[]>([]);
export const setRouteLegs = (legs: Leg[]) => routeLegs.set(legs);
export const clearRouteLegs = () => routeLegs.set([]);

/**
 * Show calc info
 */
export const isRouteCalcInfoVisible = writable(false);
export const showRouteCalcInfo = () => isRouteCalcInfoVisible.set(true);
export const hideRouteCalcInfo = () => isRouteCalcInfoVisible.set(false);

/**
 * Total Route Distance Info
 */
export const totalLegDistance = writable(0);
export const addToTotalLegDistance = (distance: number) =>
  totalLegDistance.update((val) => (val += distance));

/**
 * Total Route Duration Info
 */
export const totalLegDuration = writable(0);
export const addToTotalLegDuration = (duration: number) =>
  totalLegDuration.update((val) => (val += duration));
