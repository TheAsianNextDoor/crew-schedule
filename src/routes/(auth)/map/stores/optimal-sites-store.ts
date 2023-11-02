import { derived, get, writable } from 'svelte/store';
import { getBaseHydratedMarkers, type HydratedMapMarker } from './map-marker-store';
import { MARKER_PINS, changeMarkerPin } from '../helpers/marker-pin-utils';

export const optimalSitesStore = writable<HydratedMapMarker[]>([]);

const getOptimalSites = () => get(optimalSitesStore);
const setOptimalSites = (items: HydratedMapMarker[]) => optimalSitesStore.set(items);
const clearOptimalSites = () => optimalSitesStore.set([]);

const addToOptimalSites = (items: HydratedMapMarker) => {
  optimalSitesStore.update((val) => {
    val.push(items);

    return val;
  });
};

const changePinsToOptimal = () => {
  const mapOptimalPath = getOptimalSites();
  const nonMapOptimalPathIcons = getBaseHydratedMarkers().filter((mapMarker) => {
    const index = mapOptimalPath.findIndex(({ id }) => mapMarker.id === id);

    return index === -1 ? true : false;
  });

  nonMapOptimalPathIcons.forEach(({ marker }) => changeMarkerPin(marker, MARKER_PINS.default));
  mapOptimalPath.forEach(({ marker }) => changeMarkerPin(marker, MARKER_PINS.optimal));
};

export {
  addToOptimalSites,
  getOptimalSites,
  setOptimalSites,
  clearOptimalSites,
  changePinsToOptimal,
};

export const isMaxOptimalSitesStore = derived([optimalSitesStore], ([$mapOptimalPathStore]) => {
  return $mapOptimalPathStore.length >= 10;
});
