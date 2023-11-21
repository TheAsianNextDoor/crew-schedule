import type { LOCATION_TYPES_ENUM } from '$lib/constants/location-types';

export type HydratedSelectedEntity<T = unknown> = {
  entity: T;
  address: string;
  type?: keyof typeof LOCATION_TYPES_ENUM;
};
