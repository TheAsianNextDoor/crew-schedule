import { get, writable } from 'svelte/store';
import { EQUALITY_ENUM } from '../helpers/equality-utils';

/**
 * Map filter visibility
 */
export const isMapFilterVisibleStore = writable(false);
const { set } = isMapFilterVisibleStore;

const isMapFilterVisible = () => get(isMapFilterVisibleStore);

const hideMapFilter = () => {
  set(false);
};
const showMapFilter = () => {
  set(true);
};

const toggleMapFilter = () => {
  isMapFilterVisibleStore.update((value) => !value);
};

export { isMapFilterVisible, hideMapFilter, showMapFilter, toggleMapFilter };

/**
 * Form Values
 */
export const foremanName = writable('');
export const estimatedHoursCondition = writable(EQUALITY_ENUM.eq);
export const estimatedHours = writable<number | undefined>();
export const phaseStatus = writable('');
export const disciplineName = writable('');
export const dateRange = writable({});
