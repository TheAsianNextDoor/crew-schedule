import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
import { GOOGLE_MAPS, setGoogleMaps } from '$lib/constants/google-maps.js';
import { Loader } from '@googlemaps/js-api-loader';
import { baseHydratedMarkerStore, getSelectedHydratedMarker } from './stores/map-marker-store.js';
import queryString from 'query-string';
import { filterMarkers } from './filter/filter-markers.js';
import type { CrewHoursValue } from './filter/filter-funcs.js';
import {
  loadFilterFields,
  loadFiltersFromUrl,
  loadSelectedEntityFromUrl,
  loadSelectedHydratedMarkerFromUrl,
} from './helpers/load-state-utils.js';
import { setSelectedEntity } from './stores/selected-entity-store.js';
import { getFilterQueryParams } from './filter/filter-store.js';

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

  selectedLocationId: string;
};

export const ssr = false;

export const load = async ({ data, url }) => {
  if (!GOOGLE_MAPS) {
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
  }

  const { searchParams } = url;
  const queryParams = queryString.parse(searchParams.toString());
  loadFiltersFromUrl(url);
  const fields: Fields = loadFilterFields(queryParams);

  // must be in subscribe to wait for map page to populate
  baseHydratedMarkerStore.subscribe(async (val) => {
    if (val.length) {
      filterMarkers(getFilterQueryParams());
      loadSelectedHydratedMarkerFromUrl(fields.selectedLocationId);
      setSelectedEntity(
        await loadSelectedEntityFromUrl(
          data.customerId,
          fields.selectedLocationId,
          getSelectedHydratedMarker(),
        ),
      );
    }
  });

  return { fields, ...data };
};
