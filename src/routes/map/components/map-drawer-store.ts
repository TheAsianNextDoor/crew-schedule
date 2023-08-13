import { writable } from 'svelte/store';

import type { MapSite } from '../queries/retrieve-map-sites';

export const isMapDrawerHidden = writable(false);
export const searchHistoryList = writable<string[]>([]);
export const selectedEntity = writable<MapSite>();

export const hideMapDrawer = () => {
  console.log('hide');
  isMapDrawerHidden.set(true);
};

export const showMapDrawer = () => {
  console.log('show');
  isMapDrawerHidden.set(false);
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
