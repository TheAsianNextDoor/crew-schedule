import type { LOCATION_TYPES_ENUM } from '$lib/constants/location-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HydratedSelectedEntity<T = any> = {
  entity: T;
  address: string;
  type?: keyof typeof LOCATION_TYPES_ENUM;
};
