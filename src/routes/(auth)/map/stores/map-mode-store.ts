import { get, writable } from 'svelte/store';
import { MARKER_PINS, changeMarkerPin } from '../helpers/marker-pin-utils';
import { getBaseHydratedMarkers } from './map-marker-store';

export type MapMode = 'base' | 'routes' | 'matrix' | 'optimal';

export const mapModeStore = writable<MapMode>('base');
const { set } = mapModeStore;

export const getMapMode = () => get(mapModeStore);

export const setMapModeBase = () => {
  set('base');
  getBaseHydratedMarkers().forEach(({ marker }) => changeMarkerPin(marker, MARKER_PINS.default));
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
