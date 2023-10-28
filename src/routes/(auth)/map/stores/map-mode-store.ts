import { get, writable } from 'svelte/store';
import { MARKER_PINS, changeMarkerPin } from '../helpers/marker-pin-utils';
import { getBaseHydratedMarkers } from './map-marker-store';

export type MapMode = 'base' | 'routes' | 'matrix';

export const mapModeStore = writable<MapMode>('base');

const getMapMode = () => get(mapModeStore);

const setMapModeBase = () => {
  mapModeStore.set('base');

  getBaseHydratedMarkers().forEach(({ marker }) =>
    changeMarkerPin(marker, google.maps.marker.PinElement, MARKER_PINS.default),
  );
};

const setMapModeRoutes = () => {
  mapModeStore.set('routes');
};

const setMapModeMatrix = () => {
  mapModeStore.set('matrix');
};

export { getMapMode, setMapModeBase, setMapModeRoutes, setMapModeMatrix };
