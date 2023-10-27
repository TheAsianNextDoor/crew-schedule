import type { InfoWindowInstance } from '$lib/constants/google-maps';
import { get, writable } from 'svelte/store';

const infoWindowStore = writable<InfoWindowInstance>();
const { set: setInfoWindow } = infoWindowStore;

const getInfoWindow = () => get(infoWindowStore);

export { setInfoWindow, getInfoWindow };
