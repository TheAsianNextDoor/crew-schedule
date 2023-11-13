import { STATUS_ENUM } from '$lib/constants/status.js';
import { retrievePhasesBySite, type MapPhase } from './queries/retrieve-phases-by-site.js';
import { retrieveMapSites, type MapSite } from './queries/retrieve-map-sites.js';
import { retrieveDisciplines } from './queries/retrieve-disciplines-by-customer.js';
import { LOCATION_TYPES_ENUM } from '$lib/constants/location-types.js';
import {
  retrieveMobilizationHubs,
  type UnHydratedMobilizationHubs,
} from './queries/retrieve-mobilization-hubs.js';

export type HydratedMapPhase = MapPhase & {
  id: string;
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

export type HydratedMobilizationHub = Omit<
  UnHydratedMobilizationHubs,
  'lat' | 'lng' | 'location_id'
>;

export type GenericHydratedLocation<T> = {
  location_id: string;
  lat: number;
  lng: number;
  type: keyof typeof LOCATION_TYPES_ENUM;
  address: string;
  content: T;
};

export type HydratedLocation = GenericHydratedLocation<HydratedMapSite | HydratedMobilizationHub>;
export type HydratedSiteLocation = GenericHydratedLocation<HydratedMapSite>;
export type HydratedMobilizationHubLocation = GenericHydratedLocation<HydratedMobilizationHub>;

const findCurrentPhase = (phase: HydratedMapPhase) => phase.status_name === STATUS_ENUM.IN_PROGRESS;

const addCrewInfo = (phase: MapPhase) => {
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
      const phases = (await retrievePhasesBySite(site.id)) as HydratedMapPhase[];
      phases.forEach(addCrewInfo);
      phases.forEach((phase) => (phase.id = phase.phase_id));
      const currentPhase = phases.find(findCurrentPhase) || null;

      return {
        ...site,
        currentPhase,
        phases,
      };
    }),
  );

const createMapLocation = (
  item: UnHydratedMapSite | UnHydratedMobilizationHubs,
  type: keyof typeof LOCATION_TYPES_ENUM,
): HydratedLocation => {
  const { location_id, lat, lng, ...content } = item;

  return {
    location_id,
    lat,
    lng,
    type,
    address: buildAddress(item.street, item.city, item.state, item.zip_code, item.country),
    content,
  };
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
  const {
    employee: { customer_id: customerId },
  } = await parent();

  const sites = await retrieveMapSites(customerId);
  const mapSitesWithPhases: UnHydratedMapSite[] = await getMapSitesWithPhases(sites);
  const siteLocations = mapSitesWithPhases.map((site) =>
    createMapLocation(site, LOCATION_TYPES_ENUM.site),
  );

  const disciplines = (await retrieveDisciplines(customerId)).map((item) => item.discipline_name);

  const mobilizationHubs = (await retrieveMobilizationHubs(customerId)).map((hub) =>
    createMapLocation(hub, LOCATION_TYPES_ENUM.mobilizationHub),
  );

  return { locations: [...siteLocations, ...mobilizationHubs], disciplines };
}
