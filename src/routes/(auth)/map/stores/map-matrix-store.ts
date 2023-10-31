import { derived, get, writable } from 'svelte/store';
import { getBaseHydratedMarkers, type HydratedMapMarker } from './map-marker-store';
import { MARKER_PINS, changeMarkerPin } from '../helpers/marker-pin-utils';

export interface MatrixStore {
  origin: HydratedMapMarker | null;
  destinations: HydratedMapMarker[];
}

export const mapMatrixStore = writable<MatrixStore>({
  origin: null,
  destinations: [],
});

const getMatrixOrigin = () => get(mapMatrixStore).origin;
const getMatrixDestinations = () => get(mapMatrixStore).destinations;

const getMapMatrices = () => {
  const { origin, destinations } = get(mapMatrixStore);

  return [...(origin ? [origin] : []), ...destinations];
};
const setMatrixOrigin = (item: HydratedMapMarker) =>
  mapMatrixStore.update((val) => {
    const destinations = getMatrixDestinations();
    const index = destinations.findIndex((val) => item.id === val.id);
    if (index !== -1) {
      setMatrixDestinations(destinations.filter((val) => val.id !== item.id));
    }

    val.origin = item;

    return val;
  });
const clearMatrixOrigin = () =>
  mapMatrixStore.update((val) => {
    val.origin = null;

    return val;
  });
const setMatrixDestinations = (items: HydratedMapMarker[]) =>
  mapMatrixStore.update((val) => {
    val.destinations = items;

    return val;
  });
const clearMatrixDestinations = () =>
  mapMatrixStore.update((val) => {
    val.destinations = [];

    return val;
  });

const addToMatrixDestinations = (items: HydratedMapMarker) => {
  mapMatrixStore.update((val) => {
    val.destinations.push(items);

    return val;
  });
};

const changePinsToMatrix = () => {
  const mapMatrices = getMapMatrices();

  const nonMapMatrixIcons = getBaseHydratedMarkers().filter((mapMarker) => {
    const index = mapMatrices.findIndex(({ id }) => mapMarker.id === id);

    return index === -1 ? true : false;
  });

  nonMapMatrixIcons.forEach(({ marker }) => changeMarkerPin(marker, MARKER_PINS.default));
  mapMatrices.forEach(({ marker }) => changeMarkerPin(marker, MARKER_PINS.matrixDestination));
};

export {
  getMatrixOrigin,
  getMatrixDestinations,
  addToMatrixDestinations,
  clearMatrixOrigin,
  setMatrixOrigin,
  getMapMatrices,
  setMatrixDestinations,
  clearMatrixDestinations,
  changePinsToMatrix,
};

export const isMaxMatrixDestinationStore = derived([mapMatrixStore], ([$mapRoutesStore]) => {
  return $mapRoutesStore.destinations.length >= 10;
});

export const isSelectingMatrixOrigin = writable(false);
export const getIsSelectingMatrixOrigin = () => get(isSelectingMatrixOrigin);
export const setIsSelectingMatrixOrigin = () => isSelectingMatrixOrigin.set(true);
export const setIsNotSelectingMatrixOrigin = () => isSelectingMatrixOrigin.set(false);
