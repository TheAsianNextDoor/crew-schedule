import { writable } from 'svelte/store';

import type { MapSite } from '../queries/retrieve-map-sites';

export const isMapMenuVisible = writable(true);
export const isMapMenuFilterVisible = writable(false);
export const searchHistoryList = writable<string[]>([]);
export const selectedEntity = writable<MapSite>();

export const hideMapMenu = () => {
  console.log('hide');
  isMapMenuVisible.set(false);
};

export const showMapMenu = () => {
  console.log('show');
  isMapMenuVisible.set(true);
};

export const addToHistoryList = (item: string) => {
  searchHistoryList.update((value) => {
    if (value.length > 5) {
      value.pop();
    }

    value.unshift(item);

    return value;
  });
};

export const setSelectedEntity = (site: MapSite) => {
  selectedEntity.set(site);
};
