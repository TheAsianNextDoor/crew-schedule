import type { PolylineInstance } from '$lib/constants/google-maps';
import { get, writable } from 'svelte/store';
import type { HydratedMapMarker } from './map-marker-store';

export interface HydratedPolyline {
  polyline: PolylineInstance;
  origin: HydratedMapMarker;
  destination: HydratedMapMarker;
}

export const mapPolylineStore = writable<HydratedPolyline[]>([]);
const { set: setMapPolylines } = mapPolylineStore;

const getMapPolylines = () => get(mapPolylineStore);
const addMapPolyline = (hydratedPolyline: HydratedPolyline) => {
  mapPolylineStore.update((value) => {
    value.push(hydratedPolyline);

    return value;
  });
};
const clearMapPolylines = () => {
  getMapPolylines().forEach(({ polyline }) => {
    polyline.setMap(null);
  });
  setMapPolylines([]);
};

export { getMapPolylines, setMapPolylines, addMapPolyline, clearMapPolylines };
