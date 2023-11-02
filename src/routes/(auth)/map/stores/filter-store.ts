import { get, writable } from 'svelte/store';
import { EQUALITY_ENUM } from '../helpers/equality-utils';

/**
 * Map filter visibility
 */
export const isMapFilterVisibleStore = writable(false);
const { set } = isMapFilterVisibleStore;

export const isMapFilterVisible = () => get(isMapFilterVisibleStore);

export const hideMapFilter = () => {
  set(false);
};
export const showMapFilter = () => {
  set(true);
};

export const toggleMapFilter = () => {
  isMapFilterVisibleStore.update((value) => !value);
};

/**
 * Form Values
 */
export const foremanName = writable('');
export const estimatedHoursCondition = writable(EQUALITY_ENUM.eq);
export const estimatedHours = writable<number | undefined>();
export const phaseStatus = writable('');
export const disciplineName = writable('');
export const dateRange = writable({});
