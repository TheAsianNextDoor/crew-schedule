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
  const { origin, destinations } = get(mapMatrixStore);

  const nonMapMatrixIcons = getBaseHydratedMarkers().filter((mapMarker) => {
    const index = destinations.findIndex(({ id }) => mapMarker.id === id);

    return index === -1 ? true : false;
  });

  nonMapMatrixIcons.forEach(({ marker }) => changeMarkerPin(marker, MARKER_PINS.default));
  destinations.forEach(({ marker }) => changeMarkerPin(marker, MARKER_PINS.matrixDestination));

  if (origin) {
    changeMarkerPin(origin.marker, MARKER_PINS.matrixOrigin);
  }
};

export {
  getMatrixOrigin,
  getMatrixDestinations,
  addToMatrixDestinations,
  clearMatrixOrigin,
  setMatrixOrigin,
  setMatrixDestinations,
  clearMatrixDestinations,
  changePinsToMatrix,
};

export const isMaxMatrixDestinationStore = derived([mapMatrixStore], ([$mapMatrixStore]) => {
  return $mapMatrixStore.destinations.length >= 10;
});

export const isSelectingMatrixOrigin = writable(false);
export const getIsSelectingMatrixOrigin = () => get(isSelectingMatrixOrigin);
export const setIsSelectingMatrixOrigin = () => isSelectingMatrixOrigin.set(true);
export const setIsNotSelectingMatrixOrigin = () => isSelectingMatrixOrigin.set(false);
export const toggleSelectingMatrixOrigin = () => isSelectingMatrixOrigin.update((val) => !val);
