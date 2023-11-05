import { get, writable } from 'svelte/store';
import { setAllPinsToDefault } from '../helpers/marker-pin-utils';
import { changePinsToRoutes } from './route-sites-store';
import { changePinsToMatrix } from './matrix-sites-store';
import { showMatrixPolylines } from './matrix-polyline.store';
import { showRoutePolylines } from './route-polyline-store';

export type MapMode = 'base' | 'routes' | 'matrix' | 'optimal';

export const mapModeStore = writable<MapMode>('base');
const { set } = mapModeStore;

export const getMapMode = () => get(mapModeStore);

export const setMapModeBase = () => {
  setAllPinsToDefault();
  set('base');
};

export const setMapModeRoutes = () => {
  changePinsToRoutes();
  showRoutePolylines();
  set('routes');
};

export const setMapModeMatrix = () => {
  changePinsToMatrix();
  showMatrixPolylines();
  set('matrix');
};

export const setMapModeOptimal = () => {
  set('optimal');
};
