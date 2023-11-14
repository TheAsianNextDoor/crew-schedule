import { LOCATION_TYPES_ENUM } from '$lib/constants/location-types';
import type {
  HydratedLocation,
  HydratedMobilizationHubLocation,
  HydratedSiteLocation,
} from '../+layout.server';

export const isSiteLocation = (location: HydratedLocation): location is HydratedSiteLocation =>
  location.type === LOCATION_TYPES_ENUM.site;

export const isMobilizationHubLocation = (
  location: HydratedLocation,
): location is HydratedMobilizationHubLocation =>
  location.type === LOCATION_TYPES_ENUM.mobilizationHub;
