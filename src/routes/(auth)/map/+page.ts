import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
import { setGoogleMaps } from '$lib/constants/google-maps.js';
import { Loader } from '@googlemaps/js-api-loader';
import {
  getSelectedEntity,
  selectedEntityStore,
  setSelectedEntity,
  updateSelectedLocation,
} from './stores/sidebar-store.js';
import { getBaseHydratedMarkers, updateBaseHydratedLocations } from './stores/map-marker-store.js';

export const ssr = false;

export const load = async ({ data }) => {
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

  // const selectedEntity = getSelectedEntity();
  // if (selectedEntity) {
  //   const selectedLocation = data.locations.find(
  //     (location) => location.location_id === selectedEntity.location.location_id,
  //   );

  //   if (selectedLocation) {
  //     updateSelectedLocation(selectedLocation);
  //   }
  // }

  // const baseHydratedMarkers = getBaseHydratedMarkers();
  // if (baseHydratedMarkers) {
  //   updateBaseHydratedLocations(data.locations);
  // }

  return data;
};
