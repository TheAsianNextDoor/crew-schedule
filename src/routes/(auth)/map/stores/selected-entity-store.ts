import { get, writable } from 'svelte/store';
import type { HydratedSelectedEntity } from '../../../api/v1/auth/customer/[customerId]/location/types';

export const selectedEntityStore = writable<HydratedSelectedEntity | null>(null);
export const { subscribe: selectedEntitySubscribe } = selectedEntityStore;
export const getSelectedEntity = () => get(selectedEntityStore);
export const setSelectedEntity = (mapMarker: HydratedSelectedEntity | null) => {
  selectedEntityStore.set(mapMarker);
};
