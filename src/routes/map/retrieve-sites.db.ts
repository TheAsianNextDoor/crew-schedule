import { getQuery } from '$lib/db/query';
import type { PhaseTableType } from '$lib/db/schemas/phase';
import type { SiteTableType } from '$lib/db/schemas/site';

type MapSites = Pick<
  SiteTableType,
  | 'site_id'
  | 'current_phase_id'
  | 'job_number'
  | 'name'
  | 'status'
  | 'location'
  | 'start_date_time'
  | 'finished_date_time'
> &
  Pick<PhaseTableType, 'discipline_id'>;

export const retrieveMapSites = (companyId: string) => {
  const query = `
    SELECT 
      s.site_id, 
      s.current_phase_id, 
      s.job_number, 
      s.name,
      s.status,
      s.location,
      s.start_date_time,
      s.finished_date_time,
      p.discipline_id
    FROM site s
    LEFT JOIN phase p
    ON s.current_phase_id = p.phase_id
    WHERE s.company_id = $1
  `;
  const params = [companyId];

  return getQuery<MapSites>(query, params);
};
