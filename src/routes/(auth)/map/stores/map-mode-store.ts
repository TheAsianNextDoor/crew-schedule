import { get, writable } from 'svelte/store';
import { setAllPinsToDefault } from '../helpers/marker-pin-utils';
import { showMatrixPolylines } from './matrix-polyline.store';
import { changePinsToMatrix } from './matrix-sites-store';
import { showRoutePolylines } from './route-polyline-store';
import { changePinsToRoutes } from './route-sites-store';

export type MapMode = 'base' | 'routes' | 'matrix' | 'user-profile';

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

// export const setMapModeUserProfile = () => {
//   set('user-profile');
// };
