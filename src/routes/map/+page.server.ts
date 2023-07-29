import { retrieveMapSites } from './queries/retrieve-map-sites.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
  const {
    employee: { company_id: companyId },
  } = await parent();
  const sites = await retrieveMapSites(companyId);

  return {
    sites,
  };
}
