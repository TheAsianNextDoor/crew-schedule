import { getQuery } from '$lib/db/query';
import type { Client, Site, Status } from '@prisma/client';

export type MapSite = Pick<
  Site,
  | 'site_id'
  | 'job_number'
  | 'site_name'
  | 'status_id'
  | 'location'
  | 'start_date_time'
  | 'finished_date_time'
> &
  Pick<Status, 'status_name'> &
  Pick<Client, 'client_name'>;

export const retrieveMapSites = async (customerId: string) =>
  getQuery<MapSite>(
    `
      SELECT 
        site.site_id, 
        site.job_number, 
        site.site_name,
        site.location,
        site.scheduled_date_time,
        site.start_date_time,
        site.finished_date_time,
        status.status_name,
        client.client_name
      FROM site
      LEFT JOIN client
        ON site.client_id = client.client_id
      LEFT JOIN status
        on site.status_id = status.status_id
      WHERE site.customer_id =  $1
    `,
    [customerId]
  );
