import { get, writable } from 'svelte/store';

export type MapMode = 'base' | 'routes';

export const mapModeStore = writable<MapMode>('base');
const mapModeSubscribe = mapModeStore.subscribe;

const getMapMode = () => get(mapModeStore);
const setMapMode = (name: MapMode) => {
  mapModeStore.set(name);
};

export { getMapMode, setMapMode, mapModeSubscribe };
