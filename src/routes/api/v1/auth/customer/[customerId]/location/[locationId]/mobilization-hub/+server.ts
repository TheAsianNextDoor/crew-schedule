import { parseOrThrow422 } from '$lib/utils/validation.js';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';
import {
  retrieveSelectedMobilizationHub,
  type SelectedMobilizationHub,
} from './retrieve-selected-mobilization-hub.js';
import type { HydratedSelectedEntity } from '../../types.js';
import { LOCATION_TYPES_ENUM } from '$lib/constants/location-types.js';

const buildAddress = (
  street: string,
  city: string,
  state: string,
  zipCode: string,
  country: string,
) => `${street} ${city}, ${state}, ${zipCode}, ${country}`;

const getParamsSchema = z.object({
  locationId: z.string(),
  customerId: z.string(),
});

export const GET: RequestHandler = async ({ params }) => {
  const { locationId, customerId } = parseOrThrow422(getParamsSchema, params);

  const mobilizationHub = await retrieveSelectedMobilizationHub(customerId, locationId);
  if (!mobilizationHub) {
    throw error(404, 'Not Found');
  }
  const { street, city, state, zip_code, country } = mobilizationHub;

  return json({
    entity: mobilizationHub,
    address: buildAddress(street, city, state, zip_code, country),
    type: LOCATION_TYPES_ENUM.mobilizationHub,
  } as HydratedSelectedEntity<SelectedMobilizationHub>);
};
