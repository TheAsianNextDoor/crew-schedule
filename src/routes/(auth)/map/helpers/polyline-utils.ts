import { getGoogleMaps } from '$lib/constants/google-maps';
import type { LatitudeLongitude } from '$lib/types/latitude-longitude';
import { getRouteColor } from '$lib/utils/colors';
import type { MatrixItem } from '../../../api/v1/auth/matrix/get-google-matrix';
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

export const buildRouteCalcPolyline = (leg: Leg, index: number) => {
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

  return poly;
};

export const buildMatrixCalcPolyline = (
  locations: LatitudeLongitude[],
  edge: MatrixItem,
  index: number,
) => {
  const { Polyline, LatLng } = getGoogleMaps();
  const map = getMap();
  const infoWindow = getInfoWindow();
  const strokeColor = getRouteColor(index + 4);

  const poly = new Polyline({
    map,
    path: locations.map(({ lat, lng }) => new LatLng(Number(lat), Number(lng))),
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
      `<div>Distance: ${edge.distanceMeters}</div><div>Duration: ${edge.staticDuration}</div>`,
    );
    infoWindow.open(map);
  });

  return poly;
};
