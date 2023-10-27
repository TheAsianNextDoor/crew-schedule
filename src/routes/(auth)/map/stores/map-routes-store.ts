import { derived, get, writable } from 'svelte/store';
import type { HydratedMapMarker } from './map-marker-store';

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

export { addToMapRoutes, getMapRoutes, setMapRoutes, clearMapRoutes };

export const isMaxRouteItemsStore = derived([mapRoutesStore], ([$mapRoutesStore]) => {
  return $mapRoutesStore.length >= 10;
});
