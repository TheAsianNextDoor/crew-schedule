import type { Map } from 'leaflet';
import { get, writable } from 'svelte/store';

const mapStore = writable<Map>();
const { subscribe: mapStoreSubscribe, set: setMap } = mapStore;

const getMap = () => get(mapStore);

export { mapStoreSubscribe, setMap, getMap };
