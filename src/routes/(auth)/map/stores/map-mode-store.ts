import { get, writable } from 'svelte/store';

type MapMode = 'base' | 'route';

export const mapModeStore = writable<MapMode>('base');
const getMapMode = () => get(mapModeStore);
const setMapModeName = (name: MapMode) => {
  mapModeStore.set(name);
};

export { getMapMode, setMapModeName };
