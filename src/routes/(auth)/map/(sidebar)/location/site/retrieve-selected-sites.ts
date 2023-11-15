import { queryDb } from '$lib/db/query';
import type { Address, City, Client, Country, Site, State, Status, ZipCode } from '@prisma/client';

export type SelectedSite = { id: string } & Pick<
  Site,
  | 'job_number'
  | 'estimated_hours'
  | 'scheduled_start_date_time'
  | 'scheduled_finished_date_time'
  | 'actual_start_date_time'
  | 'actual_finished_date_time'
> & { id: string; name: string } & Pick<Status, 'status_name'> &
  Pick<Client, 'client_name'> &
  Pick<Address, 'street'> &
  Pick<City, 'city'> &
  Pick<State, 'state'> &
  Pick<Country, 'country'> &
  Pick<ZipCode, 'zip_code'>;

export const retrieveSitesBySelectedLocationId = async (customerId: string, locationId: string) =>
  queryDb.findMany<SelectedSite>(
    `
      SELECT 
        site.site_id as id, 
        site.job_number, 
        site.site_name as name,
        site.estimated_hours,
        site.scheduled_start_date_time,
        site.scheduled_finished_date_time,
        site.actual_start_date_time,
        site.actual_finished_date_time,
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
        AND location.location_id = $2;
    `,
    [customerId, locationId],
  );
