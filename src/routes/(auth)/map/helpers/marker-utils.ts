import { hideMapFilter, isMapFilterVisible } from '../stores/map-filter-store';
import {
  getSelectedEntity,
  isMapMenuVisible,
  setSelectedEntity,
  showMapMenu,
} from '../stores/map-menu-store';
import { addBaseHydratedMarker, getBaseHydratedMarkers } from '../stores/map-marker-store';
import type { HydratedMapSite } from '../+page.server';
import { getMap } from '../stores/map-store';

export type Marker = google.maps.Marker;
export type Map = google.maps.Map;

interface CreateMarkerArgs {
  site: HydratedMapSite;
  map: Map;
  infoWindow: google.maps.InfoWindow;
}

export const createMarker = ({ site, map, infoWindow }: CreateMarkerArgs) => {
  const marker = new google.maps.Marker({
    map,
    position: {
      lat: site.location[0],
      lng: site.location[1],
    },
    animation: google.maps.Animation.DROP,
  });

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  marker.addListener('click', async ({ domEvent, latLng, pixel }) => {
    if (!isMapMenuVisible()) {
      showMapMenu();
    }

    if (isMapFilterVisible()) {
      hideMapFilter();
    }

    getSelectedEntity()?.marker?.setAnimation(null);
    marker.setAnimation(google.maps.Animation.BOUNCE);

    setSelectedEntity({ site, marker });
  });

  addBaseHydratedMarker({ marker: marker, site });
};

export const removeMarkerFromMap = (marker: Marker) => {
  marker.setMap(null);
};

export const addMarkerToMap = (marker: Marker) => {
  marker.setMap(getMap());
};

export const showAllMarkers = () => {
  getBaseHydratedMarkers().forEach(({ marker }) => marker.setMap(getMap()));
};
