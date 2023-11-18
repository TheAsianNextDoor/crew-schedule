import { parseOrThrow422 } from '$lib/utils/validation.js';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import {
  retrieveSelectedMobilizationHub,
  type SelectedMobilizationHub,
} from './retrieve-selected-mobilization-hub.js';

export type HydratedSelectedMobilizationHub = {
  selectedEntity: {
    mobilizationHub: SelectedMobilizationHub;
    address: string;
  };
};

const buildAddress = (
  street: string,
  city: string,
  state: string,
  zipCode: string,
  country: string,
) => `${street} ${city}, ${state}, ${zipCode}, ${country}`;

const searchParamsSchema = z.object({
  mobilizationHubId: z.string(),
});

export async function load({ url, parent }) {
  const {
    employee: { customer_id: customerId },
  } = await parent();
  const { searchParams } = url;

  const { mobilizationHubId } = parseOrThrow422(searchParamsSchema, {
    mobilizationHubId: searchParams.get('mobilization-hub-id'),
  });

  const mobilizationHub = await retrieveSelectedMobilizationHub(customerId, mobilizationHubId);
  if (!mobilizationHub) {
    throw error(404, 'Not Found');
  }
  const { street, city, state, zip_code, country } = mobilizationHub;

  return {
    selectedEntity: {
      mobilizationHub,
      address: buildAddress(street, city, state, zip_code, country),
    },
  } satisfies HydratedSelectedMobilizationHub;
}
