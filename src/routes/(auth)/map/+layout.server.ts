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
  crewHours?: number;
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

export type GenericHydratedLocation<T = HydratedMapSite | HydratedMobilizationHub> = {
  location_id: string;
  lat: number;
  lng: number;
  type: keyof typeof LOCATION_TYPES_ENUM;
  address: string;
  shortAddress: string;
  content: T;
};

export type HydratedSiteLocation = GenericHydratedLocation<HydratedMapSite>;
export type HydratedMobilizationHubLocation = GenericHydratedLocation<HydratedMobilizationHub>;

const findCurrentPhase = (phase: HydratedMapPhase) => phase.status_name === STATUS_ENUM.IN_PROGRESS;

const addCrewInfo = (phase: MapPhase) => {
  const { estimated_hours, personnel_count } = phase;
  if (estimated_hours && personnel_count) {
    // @ts-expect-error doesn't have property yet
    phase.crewHours = Number((estimated_hours / personnel_count).toFixed(2));
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

const buildShortAddress = (street: string, city: string) => `${street} ${city}`;

const getMapSitesWithPhases = async (sites: MapSite[]) =>
  Promise.all(
    sites.map(async (site) => {
      const phases = (await retrievePhasesBySite(site.id)) as HydratedMapPhase[];
      phases.forEach(addCrewInfo);
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
): GenericHydratedLocation => {
  const { location_id, lat, lng, ...content } = item;

  return {
    location_id,
    lat,
    lng,
    type,
    address: buildAddress(item.street, item.city, item.state, item.zip_code, item.country),
    shortAddress: buildShortAddress(item.street, item.city),
    content,
  };
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent, depends }) {
  depends('map:data');

  const {
    employee: { customer_id: customerId },
  } = await parent();

  const sites = await retrieveMapSites(customerId);
  const mapSitesWithPhases: UnHydratedMapSite[] = await getMapSitesWithPhases(sites);
  const siteLocations = mapSitesWithPhases.map((site) =>
    createMapLocation(site, LOCATION_TYPES_ENUM.site),
  ) as unknown as HydratedSiteLocation[];

  const disciplines = (await retrieveDisciplines(customerId)).map((item) => item.discipline_name);

  const mobilizationHubs = (await retrieveMobilizationHubs(customerId)).map((hub) =>
    createMapLocation(hub, LOCATION_TYPES_ENUM.mobilizationHub),
  ) as unknown as HydratedMobilizationHubLocation[];

  return {
    locations: [...siteLocations, ...mobilizationHubs],
    siteLocations,
    disciplines,
    customerId,
  };
}
