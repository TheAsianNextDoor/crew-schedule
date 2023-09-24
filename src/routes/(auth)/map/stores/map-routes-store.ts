import { get, writable } from 'svelte/store';

const mapRoutesStore = writable([]);
const mapRoutesSubscribe = mapRoutesStore.subscribe;

const getMapRoutes = () => get(mapRoutesStore);

export { getMapRoutes, mapRoutesSubscribe };
