export type AdvancedMarkerElementInstance = google.maps.marker.AdvancedMarkerElement;
export type MapInstance = google.maps.Map;
export type InfoWindowInstance = google.maps.InfoWindow;
export type PolylineInstance = google.maps.Polyline;
export type PinElementInstance = google.maps.marker.PinElement;

export type Map = typeof google.maps.Map;
export type AdvancedMarkerElement = typeof google.maps.marker.AdvancedMarkerElement;
export type PinElement = typeof google.maps.marker.PinElement;
export type LatLng = typeof google.maps.LatLng;
export type Encoding = typeof google.maps.geometry.encoding;
export type Polyline = typeof google.maps.Polyline;
export type InfoWindow = typeof google.maps.InfoWindow;

export interface GoogleMaps {
  Map: Map;
  AdvancedMarkerElement: AdvancedMarkerElement;
  PinElement: PinElement;
  LatLng: LatLng;
  encoding: Encoding;
  Polyline: Polyline;
  InfoWindow: InfoWindow;
}

export let GOOGLE_MAPS: GoogleMaps;

export const setGoogleMaps = (constructors: GoogleMaps) => {
  GOOGLE_MAPS = constructors;
};

export const getGoogleMaps = () => GOOGLE_MAPS;
