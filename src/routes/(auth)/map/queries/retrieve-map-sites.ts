import { queryDb } from '$lib/db/query';
import type {
  Address,
  City,
  Client,
  Country,
  Site,
  State,
  Status,
  ZipCode,
  Location,
} from '@prisma/client';

export type MapSite = Pick<Site, 'job_number'> & {
  id: string;
  name: string;
} & Pick<Location, 'location_id' | 'lat' | 'lng'> &
  Pick<Status, 'status_name'> &
  Pick<Client, 'client_name'> &
  Pick<Address, 'street'> &
  Pick<City, 'city'> &
  Pick<State, 'state'> &
  Pick<Country, 'country'> &
  Pick<ZipCode, 'zip_code'>;

export const retrieveMapSites = async (customerId: string) =>
  queryDb.findMany<MapSite>(
    `
      SELECT 
        site.job_number, 
        site.site_id as id, 
        site.site_name as name,
        location.location_id,
        location.lat,
        location.lng,
        status.status_name,
        client.client_name,
        address.street,
        city.city,
        state.state,
        country.country,
        zip_code.zip_code
      FROM site
      LEFT JOIN client
        ON site.client_id = client.client_id
      LEFT JOIN location
        on site.location_id = location.location_id
      LEFT JOIN status
        ON site.status_id = status.status_id
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
      WHERE site.customer_id = $1
    `,
    [customerId],
  );
