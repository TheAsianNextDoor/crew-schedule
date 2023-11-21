import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
import { setGoogleMaps } from '$lib/constants/google-maps.js';
import { Loader } from '@googlemaps/js-api-loader';
import { baseHydratedMarkerStore, getSelectedHydratedMarker } from './stores/map-marker-store.js';
import queryString from 'query-string';
import { filterMarkers } from './filter/filter-markers.js';
import { FILTER_KEYS, type CrewHoursValue } from './filter/filter-funcs.js';
import {
  loadFiltersFromUrl,
  loadSelectedEntityFromUrl,
  loadSelectedHydratedMarkerFromUrl,
} from './helpers/load-state-utils.js';
import { setSelectedEntity } from './stores/selected-entity-store.js';

export type Fields = {
  phaseDisciplines: string;
  phaseStatus: string;
  crewHoursValue: CrewHoursValue;
  phaseStartDate: {
    start?: Date;
    end?: Date;
  };
  phaseForeman: string;
  siteClient: string;
  siteStatus: string;

  selectedLocation: string;
};

export const ssr = false;

export const load = async ({ data, url, fetch }) => {
  const loader = new Loader({
    apiKey: PUBLIC_GOOGLE_MAPS_API_KEY,
    version: 'beta',
    libraries: ['core', 'maps', 'marker'],
  });
  const { Map, Polyline, InfoWindow } = await loader.importLibrary('maps');
  const { AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker');
  const { LatLng } = await loader.importLibrary('core');
  const { encoding } = await loader.importLibrary('geometry');

  setGoogleMaps({
    Map,
    AdvancedMarkerElement,
    PinElement,
    LatLng,
    encoding,
    Polyline,
    InfoWindow,
  });

  const { searchParams } = url;
  const queryParams = queryString.parse(searchParams.toString());

  const fields: Fields = {
    phaseDisciplines: (queryParams?.[FILTER_KEYS.phaseDiscipline] as string | undefined) || '',
    phaseStatus: (queryParams?.[FILTER_KEYS.phaseStatus] as string | undefined) || '',
    crewHoursValue: JSON.parse(
      (queryParams?.[FILTER_KEYS.phaseCrewHours] as string) || '{}',
    ) as CrewHoursValue,
    phaseStartDate: JSON.parse((queryParams?.[FILTER_KEYS.phaseStartDate] as string) || '{}') as {
      start?: Date;
      end?: Date;
    },
    phaseForeman: (queryParams?.[FILTER_KEYS.phaseForeman] as string | undefined) || '',

    siteClient: (queryParams?.[FILTER_KEYS.siteClient] as string | undefined) || '',
    siteStatus: (queryParams?.[FILTER_KEYS.siteStatus] as string | undefined) || '',

    selectedLocation: (queryParams?.['selected-location'] as string | undefined) || '',
  };

  loadFiltersFromUrl(url);

  // must be in subscribe to wait for map page to populate
  baseHydratedMarkerStore.subscribe(async (val) => {
    if (val.length) {
      filterMarkers(url);
      loadSelectedHydratedMarkerFromUrl(url);
      setSelectedEntity(
        await loadSelectedEntityFromUrl(
          data.customerId,
          fields.selectedLocation,
          getSelectedHydratedMarker(),
        ),
      );
    }
  });

  return { fields, ...data };
};
