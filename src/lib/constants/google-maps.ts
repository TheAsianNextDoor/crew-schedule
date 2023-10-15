export type MapInstance = google.maps.Map;

export type Map = typeof google.maps.Map;
export type AdvancedMarkerElement = typeof google.maps.marker.AdvancedMarkerElement;
export type PinElement = typeof google.maps.marker.PinElement;
export type LatLng = typeof google.maps.LatLng;

export interface GoogleMaps {
  Map: Map;
  AdvancedMarkerElement: AdvancedMarkerElement;
  PinElement: PinElement;
  LatLng: LatLng;
}

export let GOOGLE_MAPS: GoogleMaps;

export const setGoogleMaps = (constructors: GoogleMaps) => {
  GOOGLE_MAPS = constructors;
};

export const getGoogleMaps = () => GOOGLE_MAPS;
