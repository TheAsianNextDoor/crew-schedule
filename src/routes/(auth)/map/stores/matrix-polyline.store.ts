import { get, writable } from 'svelte/store';
import type { HydratedPolyline } from './route-polyline-store';

export const matrixPolylineStore = writable<HydratedPolyline[]>([]);
const { set: setMatrixPolylines } = matrixPolylineStore;

export const getMatrixPolylines = () => get(matrixPolylineStore);
export const addMatrixPolyline = (hydratedPolyline: HydratedPolyline) => {
  matrixPolylineStore.update((value) => {
    value.push(hydratedPolyline);

    return value;
  });
};
export const clearMatrixPolylines = () => {
  getMatrixPolylines().forEach(({ polyline }) => {
    polyline.setMap(null);
  });
  setMatrixPolylines([]);
};

export const hideMatrixPolylines = () => {
  getMatrixPolylines().forEach(({ polyline }) => {
    polyline.setVisible(false);
  });
};

export const showMatrixPolylines = () => {
  getMatrixPolylines().forEach(({ polyline }) => {
    polyline.setVisible(true);
  });
};
