import type { InfoWindowInstance } from '$lib/constants/google-maps';
import { get, writable } from 'svelte/store';

const infoWindowStore = writable<InfoWindowInstance>();
export const { set: setInfoWindow } = infoWindowStore;

export const getInfoWindow = () => get(infoWindowStore);
