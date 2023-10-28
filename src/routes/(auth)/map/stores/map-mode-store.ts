import { get, writable } from 'svelte/store';
import { MARKER_PINS, changeMarkerPin } from '../helpers/marker-pin-utils';
import { getBaseHydratedMarkers } from './map-marker-store';

export type MapMode = 'base' | 'routes' | 'matrix';

export const mapModeStore = writable<MapMode>('base');
const { set } = mapModeStore;

const getMapMode = () => get(mapModeStore);

const setMapModeBase = () => {
  set('base');
  getBaseHydratedMarkers().forEach(({ marker }) => changeMarkerPin(marker, MARKER_PINS.default));
};

const setMapModeRoutes = () => {
  set('routes');
};

const setMapModeMatrix = () => {
  set('matrix');
};

export { getMapMode, setMapModeBase, setMapModeRoutes, setMapModeMatrix };
