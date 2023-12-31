import type { MapInstance } from '$lib/constants/google-maps';
import { get, writable } from 'svelte/store';

const mapStore = writable<MapInstance>();
const { set: setMap } = mapStore;

const getMap = () => get(mapStore);

export { setMap, getMap };
