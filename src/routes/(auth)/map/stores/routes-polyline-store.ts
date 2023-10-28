import type { PolylineInstance } from '$lib/constants/google-maps';
import { get, writable } from 'svelte/store';
import type { HydratedMapMarker } from './map-marker-store';

export interface HydratedPolyline {
  polyline: PolylineInstance;
  origin: HydratedMapMarker;
  destination: HydratedMapMarker;
}

export const routesPolylineStore = writable<HydratedPolyline[]>([]);
const { set: setRoutesMapPolylines } = routesPolylineStore;

const getRoutesPolylines = () => get(routesPolylineStore);
const addRoutesPolyline = (hydratedPolyline: HydratedPolyline) => {
  routesPolylineStore.update((value) => {
    value.push(hydratedPolyline);

    return value;
  });
};
const clearRoutesPolylines = () => {
  getRoutesPolylines().forEach(({ polyline }) => {
    polyline.setMap(null);
  });
  setRoutesMapPolylines([]);
};

const hideRoutesPolylines = () => {
  getRoutesPolylines().forEach(({ polyline }) => {
    polyline.setVisible(false);
  });
};

const showRoutesPolylines = () => {
  getRoutesPolylines().forEach(({ polyline }) => {
    polyline.setVisible(true);
  });
};

export {
  getRoutesPolylines,
  setRoutesMapPolylines,
  addRoutesPolyline,
  clearRoutesPolylines,
  hideRoutesPolylines,
  showRoutesPolylines,
};
