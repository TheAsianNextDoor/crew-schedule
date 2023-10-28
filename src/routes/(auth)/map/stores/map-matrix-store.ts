import { derived, get, writable } from 'svelte/store';
import { getBaseHydratedMarkers, type HydratedMapMarker } from './map-marker-store';
import { MARKER_PINS, changeMarkerPin } from '../helpers/marker-pin-utils';

export const mapMatrixStore = writable<HydratedMapMarker[]>([]);

const getMapMatrices = () => get(mapMatrixStore);
const setMapMatrices = (items: HydratedMapMarker[]) => mapMatrixStore.set(items);
const clearMapMatrices = () => mapMatrixStore.set([]);

const addToMapMatrices = (items: HydratedMapMarker) => {
  mapMatrixStore.update((val) => {
    val.push(items);

    return val;
  });
};

const changePinsToMatrix = () => {
  const mapRoutes = getMapMatrices();
  const nonMapMatrix = getBaseHydratedMarkers().filter((mapMarker) => {
    const index = mapRoutes.findIndex(({ id }) => mapMarker.id === id);

    return index === -1 ? true : false;
  });

  nonMapMatrix.forEach(({ marker }) => changeMarkerPin(marker, MARKER_PINS.default));
  mapRoutes.forEach(({ marker }) => changeMarkerPin(marker, MARKER_PINS.matrix));
};

export { addToMapMatrices, getMapMatrices, setMapMatrices, clearMapMatrices, changePinsToMatrix };

export const isMaxMatrixItemsStore = derived([mapMatrixStore], ([$mapRoutesStore]) => {
  return $mapRoutesStore.length >= 10;
});
