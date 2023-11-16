import { queryDb } from '$lib/db/query';
import type { Address, City, Country, MobilizationHub, State, ZipCode } from '@prisma/client';

export type SelectedMobilizationHub = { id: string; name: string } & Pick<
  MobilizationHub,
  'hub_notes' | 'hub_phone_number'
> & { id: string; name: string } & Pick<Address, 'street'> &
  Pick<City, 'city'> &
  Pick<State, 'state'> &
  Pick<Country, 'country'> &
  Pick<ZipCode, 'zip_code'>;

export const retrieveSelectedMobilizationHub = async (
  customerId: string,
  mobilizationHubId: string,
) =>
  queryDb.findFirst<SelectedMobilizationHub>(
    `
      SELECT 
        mobilization_hub.mobilization_hub_id as id, 
        mobilization_hub.hub_name as name,
        mobilization_hub.hub_phone_number,
        mobilization_hub.hub_notes,
        address.street,
        city.city,
        state.state,
        country.country,
        zip_code.zip_code
      FROM mobilization_hub
      LEFT JOIN location
        on mobilization_hub.location_id = location.location_id
      LEFT JOIN address
        ON location.address_id = address.address_id
      LEFT JOIN city
        ON address.city_id = city.city_id
      LEFT JOIN state
        ON address.state_id = state.state_id
      LEFT JOIN zip_code
        ON address.zip_code_id = zip_code.zip_code_id
      LEFT JOIN country
        ON address.country_id = country.country_id
      WHERE mobilization_hub.customer_id = $1
        AND mobilization_hub.location_id = $2;
    `,
    [customerId, mobilizationHubId],
  );
