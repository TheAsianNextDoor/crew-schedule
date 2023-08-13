import { retrieveMapSites } from './queries/retrieve-map-sites.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
  const {
    employee: { customer_id: customerId },
  } = await parent();
  const sites = await retrieveMapSites(customerId);

  return {
    sites,
  };
}
