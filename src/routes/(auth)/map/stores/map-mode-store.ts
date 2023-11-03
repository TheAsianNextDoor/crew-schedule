import { get, writable } from 'svelte/store';
import { setAllPinsToDefault } from '../helpers/marker-pin-utils';

export type MapMode = 'base' | 'routes' | 'matrix' | 'optimal';

export const mapModeStore = writable<MapMode>('base');
const { set } = mapModeStore;

export const getMapMode = () => get(mapModeStore);

export const setMapModeBase = () => {
  set('base');
  setAllPinsToDefault();
};

export const setMapModeRoutes = () => {
  set('routes');
};

export const setMapModeMatrix = () => {
  set('matrix');
};

export const setMapModeOptimal = () => {
  set('optimal');
};
