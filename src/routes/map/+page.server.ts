import { retrieveSites } from './retrieve-sites.db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
  const {
    employee: { company_id: companyId },
  } = await parent();
  const sites = await retrieveSites(companyId);

  return {
    sites,
  };
}
