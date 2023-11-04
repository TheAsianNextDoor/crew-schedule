import { STATUS_ENUM } from '$lib/constants/status.js';
import { retrievePhasesBySite, type MapPhase } from './queries/retrieve-phases-by-site.js';
import { retrieveMapSites, type MapSite } from './queries/retrieve-map-sites.js';
import { retrieveDisciplines } from './queries/retrieve-disciplines-by-customer.js';
import type { LOCATION_TYPES_ENUM } from '$lib/constants/location-types.js';

export type LatLng = {
  lat: number;
  lng: number;
};

export type HydratedMapPhase = MapPhase & {
  crewHours?: number;
  crewMobilizationHours?: number;
};

export type UnHydratedMapSite = MapSite & {
  currentPhase: HydratedMapPhase | null;
  phases: HydratedMapPhase[];
};
export type HydratedMapSite = Omit<MapSite, 'lat' | 'lng' | 'location_id'> & {
  currentPhase: HydratedMapPhase | null;
  phases: HydratedMapPhase[];
};

export type SiteLocation = {
  location_id: string;
  lat: number;
  lng: number;
  type: keyof typeof LOCATION_TYPES_ENUM;
  address: string;
  content: HydratedMapSite;
};

const findCurrentPhase = (phase: HydratedMapPhase) => phase.status_name === STATUS_ENUM.IN_PROGRESS;

const addCrewInfo = (phase: MapPhase): HydratedMapPhase => {
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

const buildAddress = (
  street: string,
  city: string,
  state: string,
  zipCode: string,
  country: string,
) => `${street} ${city}, ${state}, ${zipCode}, ${country}`;

const getMapSitesWithPhases = async (sites: MapSite[]) =>
  Promise.all(
    sites.map(async (site) => {
      const phases = (await retrievePhasesBySite(site.site_id)) as HydratedMapPhase[];
      phases.forEach(addCrewInfo);

      const currentPhase = phases.find(findCurrentPhase) || null;

      return {
        ...site,
        currentPhase,
        phases,
      };
    }),
  );

const createLocationMapSite = (mapSite: UnHydratedMapSite): SiteLocation => {
  const { location_id, lat, lng, ...content } = mapSite;

  return {
    location_id,
    lat,
    lng,
    type: 'site',
    address: buildAddress(
      mapSite.street,
      mapSite.city,
      mapSite.state,
      mapSite.zip_code,
      mapSite.country,
    ),
    content,
  };
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
  const {
    employee: { customer_id: customerId },
  } = await parent();

  const sites = await retrieveMapSites(customerId);
  const mapSitesWithPhases = await getMapSitesWithPhases(sites);
  const siteLocations = mapSitesWithPhases.map(createLocationMapSite);

  const disciplines = (await retrieveDisciplines(customerId)).map((item) => item.discipline_name);

  return { locations: siteLocations, disciplines };
}
