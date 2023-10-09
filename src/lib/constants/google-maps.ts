interface GoogleMaps {
  Map: typeof google.maps.Map;
  AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement;
  PinElement: typeof google.maps.marker.PinElement;
  LatLng: typeof google.maps.LatLng;
}

export let GOOGLE_MAPS: GoogleMaps;

export const setGoogleMaps = (constructors: GoogleMaps) => {
  GOOGLE_MAPS = constructors;
};

export const getGoogleMaps = () => GOOGLE_MAPS;
