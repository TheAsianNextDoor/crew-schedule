import { derived, get, writable } from 'svelte/store';
import { getBaseHydratedMarkers, type HydratedMapMarker } from './map-marker-store';
import { MARKER_PINS, changeMarkerPin } from '../helpers/marker-pin-utils';

export interface MatrixStore {
  origin: HydratedMapMarker | null;
  destinations: HydratedMapMarker[];
}

export const matrixSitesStore = writable<MatrixStore>({
  origin: null,
  destinations: [],
});

export const getMatrixSites = () => get(matrixSitesStore);
export const getMatrixOrigin = () => get(matrixSitesStore).origin;
export const getMatrixDestinations = () => get(matrixSitesStore).destinations;

export const setMatrixOrigin = (item: HydratedMapMarker) =>
  matrixSitesStore.update((val) => {
    const destinations = getMatrixDestinations();
    const index = destinations.findIndex((val) => item.id === val.id);
    if (index !== -1) {
      setMatrixDestinations(destinations.filter((val) => val.id !== item.id));
    }

    val.origin = item;

    return val;
  });
export const clearMatrixOrigin = () =>
  matrixSitesStore.update((val) => {
    val.origin = null;

    return val;
  });
export const setMatrixDestinations = (items: HydratedMapMarker[]) =>
  matrixSitesStore.update((val) => {
    val.destinations = items;

    return val;
  });
export const clearMatrixDestinations = () =>
  matrixSitesStore.update((val) => {
    val.destinations = [];

    return val;
  });

export const addToMatrixDestinations = (items: HydratedMapMarker) => {
  matrixSitesStore.update((val) => {
    val.destinations.push(items);

    return val;
  });
};

export const changePinsToMatrix = () => {
  const { origin, destinations } = get(matrixSitesStore);

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

/**
 * Derived Value for max destination
 */
export const isMaxMatrixDestinationStore = derived([matrixSitesStore], ([$mapMatrixStore]) => {
  return $mapMatrixStore.destinations.length >= 10;
});

/**
 * For selecting origin node
 */
export const isSelectingMatrixOrigin = writable(false);
export const getIsSelectingMatrixOrigin = () => get(isSelectingMatrixOrigin);
export const setIsSelectingMatrixOrigin = () => isSelectingMatrixOrigin.set(true);
export const setIsNotSelectingMatrixOrigin = () => isSelectingMatrixOrigin.set(false);
export const toggleSelectingMatrixOrigin = () => isSelectingMatrixOrigin.update((val) => !val);
