import { STATUS_ENUM } from '$lib/constants/status.js';
import { parseOrThrow422 } from '$lib/utils/validation.js';
import { json, type RequestHandler } from '@sveltejs/kit';
import { retrieveSitesBySelectedLocationId, type SelectedSite } from './retrieve-selected-sites.js';
import { z } from 'zod';
import { retrievePhasesBySelectedSiteId, type SelectedPhase } from './retrieve-selected-phases.js';
import type { HydratedSelectedEntity } from '../../types.js';
import { LOCATION_TYPES_ENUM } from '$lib/constants/location-types.js';

export type HydratedSelectedPhase = SelectedPhase & {
  crewHours: string;
  crewMobilizationHours: string;
};

export type HydratedSelectedSite = SelectedSite & {
  currentPhase: HydratedSelectedPhase | null;
  phases: HydratedSelectedPhase[];
};

const findCurrentPhase = (phase: HydratedSelectedPhase) =>
  phase.status_name === STATUS_ENUM.IN_PROGRESS;

const addCrewInfo = (phase: SelectedPhase) => {
  const { estimated_hours, estimated_mobilization_duration, personnel_count } = phase;
  if (estimated_hours && personnel_count) {
    // @ts-expect-error doesn't have property yet
    phase.crewHours = (estimated_hours / personnel_count).toFixed(2);
  }

  if (estimated_mobilization_duration && personnel_count) {
    // @ts-expect-error doesn't have property yet
    phase.crewMobilizationHours = (estimated_mobilization_duration / personnel_count).toFixed(2);
  }

  return phase;
};

const getMapSitesWithPhases = async (sites: SelectedSite[]) =>
  Promise.all(
    sites.map(async (site) => {
      const phases = (await retrievePhasesBySelectedSiteId(site.id)) as HydratedSelectedPhase[];
      phases.forEach(addCrewInfo);

      return {
        ...site,
        currentPhase: phases.find(findCurrentPhase) || null,
        phases,
      };
    }),
  );

const buildAddress = (
  street: string,
  city: string,
  state: string,
  zipCode: string,
  country: string,
) => `${street} ${city}, ${state}, ${zipCode}, ${country}`;

const getParamsSchema = z.object({
  locationId: z.string(),
  customerId: z.string(),
});

export const GET: RequestHandler = async ({ params }) => {
  const { locationId, customerId } = parseOrThrow422(getParamsSchema, params);

  const sites = await retrieveSitesBySelectedLocationId(customerId, locationId);
  if (!sites.length) {
    return json({ sites: [], address: null });
  }
  const sitesWithPhases = (await getMapSitesWithPhases(sites)) as HydratedSelectedSite[];
  const { street, city, state, zip_code, country } = sitesWithPhases[0];

  return json({
    entity: sitesWithPhases,
    address: buildAddress(street, city, state, zip_code, country),
    type: LOCATION_TYPES_ENUM.site,
  } satisfies HydratedSelectedEntity<HydratedSelectedSite[]>);
};
