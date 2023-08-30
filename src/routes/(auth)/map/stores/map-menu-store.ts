import { get, writable } from 'svelte/store';

import type { MapSite } from '../queries/retrieve-map-sites';

/**
 * The selected map entity to display in the menu
 */
const selectedEntityStore = writable<MapSite>();
const { subscribe: selectedEntitySubscribe } = selectedEntityStore;
const setSelectedEntity = (site: MapSite) => {
  selectedEntityStore.set(site);
};

export { selectedEntitySubscribe, setSelectedEntity };

/**
 * Map menu visibility flag
 */
const mapMenuStore = writable(true);
const { subscribe: mapMenuSubscribe } = mapMenuStore;

const isMapMenuVisible = () => get(mapMenuStore);
const hideMapMenu = () => {
  mapMenuStore.set(false);
};
const showMapMenu = () => {
  mapMenuStore.set(true);
};

export { mapMenuSubscribe, isMapMenuVisible, hideMapMenu, showMapMenu };
