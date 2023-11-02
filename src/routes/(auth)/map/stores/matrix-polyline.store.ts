import { get, writable } from 'svelte/store';
import type { HydratedPolyline } from './route-polyline-store';

export const matrixPolylineStore = writable<HydratedPolyline[]>([]);
const { set: setMatrixPolylines } = matrixPolylineStore;

const getMatrixPolylines = () => get(matrixPolylineStore);
const addMatrixPolyline = (hydratedPolyline: HydratedPolyline) => {
  matrixPolylineStore.update((value) => {
    value.push(hydratedPolyline);

    return value;
  });
};
const clearMatrixPolylines = () => {
  getMatrixPolylines().forEach(({ polyline }) => {
    polyline.setMap(null);
  });
  setMatrixPolylines([]);
};

const hideMatrixPolylines = () => {
  getMatrixPolylines().forEach(({ polyline }) => {
    polyline.setVisible(false);
  });
};

const showMatrixPolylines = () => {
  getMatrixPolylines().forEach(({ polyline }) => {
    polyline.setVisible(true);
  });
};

export {
  getMatrixPolylines,
  setMatrixPolylines,
  addMatrixPolyline,
  clearMatrixPolylines,
  hideMatrixPolylines,
  showMatrixPolylines,
};
