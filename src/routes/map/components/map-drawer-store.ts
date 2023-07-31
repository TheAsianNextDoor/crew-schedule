import { writable } from 'svelte/store';

export const isMapDrawerHidden = writable(false);

export const hideMapDrawer = () => {
  console.log('hide');
  isMapDrawerHidden.set(true);
};

export const showMapDrawer = () => {
  console.log('show');
  isMapDrawerHidden.set(false);
};
