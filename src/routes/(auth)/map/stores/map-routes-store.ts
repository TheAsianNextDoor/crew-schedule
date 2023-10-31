import { derived, get, writable } from 'svelte/store';
import { getBaseHydratedMarkers, type HydratedMapMarker } from './map-marker-store';
import { MARKER_PINS, changeMarkerPin } from '../helpers/marker-pin-utils';

export const mapRoutesStore = writable<HydratedMapMarker[]>([]);

const getMapRoutes = () => get(mapRoutesStore);
const setMapRoutes = (items: HydratedMapMarker[]) => mapRoutesStore.set(items);
const clearMapRoutes = () => mapRoutesStore.set([]);

const addToMapRoutes = (items: HydratedMapMarker) => {
  mapRoutesStore.update((val) => {
    val.push(items);

    return val;
  });
};

const changePinsToRoutes = () => {
  const mapRoutes = getMapRoutes();
  const nonMapRouteIcons = getBaseHydratedMarkers().filter((mapMarker) => {
    const index = mapRoutes.findIndex(({ id }) => mapMarker.id === id);

    return index === -1 ? true : false;
  });

  nonMapRouteIcons.forEach(({ marker }) => changeMarkerPin(marker, MARKER_PINS.default));
  mapRoutes.forEach(({ marker }) => changeMarkerPin(marker, MARKER_PINS.routes));
};

export { addToMapRoutes, getMapRoutes, setMapRoutes, clearMapRoutes, changePinsToRoutes };

export const isMaxRouteItemsStore = derived([mapRoutesStore], ([$mapRoutesStore]) => {
  return $mapRoutesStore.length >= 10;
});
