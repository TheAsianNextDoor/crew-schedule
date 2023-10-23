import { getGoogleMaps } from '$lib/constants/google-maps';
import { getRouteColor } from '$lib/utils/colors';
import { getInfoWindow } from '../stores/info-window-store';
import { getMap } from '../stores/map-store';

export type Leg = {
  polyline: {
    encodedPolyline: string;
  };
  localizedValues: {
    distance: {
      text: string;
    };
    duration: {
      text: string;
    };
    staticDuration: {
      text: string;
    };
  };
};

export const addRouteCalcPolyline = (leg: Leg, index: number) => {
  const { encoding, Polyline } = getGoogleMaps();
  const map = getMap();
  const infoWindow = getInfoWindow();
  const path = encoding.decodePath(leg.polyline.encodedPolyline);
  const strokeColor = getRouteColor(index + 4);

  const poly = new Polyline({
    map,
    path,
    geodesic: true,
    strokeColor,
    strokeOpacity: 1.0,
    strokeWeight: 4,
    clickable: true,
  });

  poly.addListener('click', (e: MouseEvent) => {
    // @ts-expect-error
    infoWindow.setPosition(e.latLng);
    infoWindow.setContent(
      `<div>Distance: ${leg.localizedValues.distance.text}</div><div>Duration: ${leg.localizedValues.duration.text}</div>`,
    );
    infoWindow.open(map);
  });
};
