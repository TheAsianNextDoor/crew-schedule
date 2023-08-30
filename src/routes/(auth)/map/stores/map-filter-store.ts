import { get, writable } from 'svelte/store';

/**
 * Map filter visibility
 */
const mapFilterStore = writable(false);
const { subscribe: mapFilterSubscribe, set } = mapFilterStore;

const isMapFilterVisible = () => get(mapFilterStore);

const hideMapFilter = () => {
  set(false);
};
const showMapFilter = () => {
  set(true);
};

export { mapFilterSubscribe, isMapFilterVisible, hideMapFilter, showMapFilter };
