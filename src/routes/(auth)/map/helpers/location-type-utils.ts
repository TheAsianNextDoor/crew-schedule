import { LOCATION_TYPES_ENUM } from '$lib/constants/location-types';
import type {
  GenericHydratedLocation,
  HydratedMobilizationHubLocation,
  HydratedSiteLocation,
} from '../+layout.server';

export const isSiteLocation = (
  location: GenericHydratedLocation,
): location is HydratedSiteLocation => location.type === LOCATION_TYPES_ENUM.site;

export const isMobilizationHubLocation = (
  location: GenericHydratedLocation,
): location is HydratedMobilizationHubLocation =>
  location.type === LOCATION_TYPES_ENUM.mobilizationHub;
