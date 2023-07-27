import { getQuery } from '$lib/db/query';
import type { SiteTableType } from '$lib/db/schemas/site';

export const retrieveSites = (companyId: string) => {
  const query = `
    SELECT * 
    FROM site
    WHERE company_id = $1
  `;
  const params = [companyId];

  return getQuery<SiteTableType[]>(query, params);
};
