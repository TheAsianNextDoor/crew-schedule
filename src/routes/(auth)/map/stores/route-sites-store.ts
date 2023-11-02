import { derived, get, writable } from 'svelte/store';
import { getBaseHydratedMarkers, type HydratedMapMarker } from './map-marker-store';
import { MARKER_PINS, changeMarkerPin } from '../helpers/marker-pin-utils';

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
