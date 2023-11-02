import type { PolylineInstance } from '$lib/constants/google-maps';
import { get, writable } from 'svelte/store';
import type { HydratedMapMarker } from './map-marker-store';

export interface HydratedPolyline {
  polyline: PolylineInstance;
  origin: HydratedMapMarker;
  destination: HydratedMapMarker;
}

export const routePolylineStore = writable<HydratedPolyline[]>([]);
const { set: setRouteMapPolylines } = routePolylineStore;

export const getRoutePolylines = () => get(routePolylineStore);
export const addRoutePolyline = (hydratedPolyline: HydratedPolyline) => {
  routePolylineStore.update((value) => {
    value.push(hydratedPolyline);

    return value;
  });
};
export const clearRoutePolylines = () => {
  getRoutePolylines().forEach(({ polyline }) => {
    polyline.setMap(null);
  });
  setRouteMapPolylines([]);
};

export const hideRoutePolylines = () => {
  getRoutePolylines().forEach(({ polyline }) => {
    polyline.setVisible(false);
  });
};

export const showRoutePolylines = () => {
  getRoutePolylines().forEach(({ polyline }) => {
    polyline.setVisible(true);
  });
};
