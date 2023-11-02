import type { PolylineInstance } from '$lib/constants/google-maps';
import { get, writable } from 'svelte/store';
import type { HydratedMapMarker } from './map-marker-store';

export interface HydratedPolyline {
  polyline: PolylineInstance;
  origin: HydratedMapMarker;
  destination: HydratedMapMarker;
}

export const optimalPolylineStore = writable<HydratedPolyline[]>([]);
const { set: setOptimalMapPolyline } = optimalPolylineStore;

const getOptimalPolyline = () => get(optimalPolylineStore);
const addOptimalPolyline = (hydratedPolyline: HydratedPolyline) => {
  optimalPolylineStore.update((value) => {
    value.push(hydratedPolyline);

    return value;
  });
};
const clearOptimalPolyline = () => {
  getOptimalPolyline().forEach(({ polyline }) => {
    polyline.setMap(null);
  });
  setOptimalMapPolyline([]);
};

const hideOptimalPolyline = () => {
  getOptimalPolyline().forEach(({ polyline }) => {
    polyline.setVisible(false);
  });
};

const showOptimalPolyline = () => {
  getOptimalPolyline().forEach(({ polyline }) => {
    polyline.setVisible(true);
  });
};

export {
  getOptimalPolyline,
  setOptimalMapPolyline,
  addOptimalPolyline,
  clearOptimalPolyline,
  hideOptimalPolyline,
  showOptimalPolyline,
};
