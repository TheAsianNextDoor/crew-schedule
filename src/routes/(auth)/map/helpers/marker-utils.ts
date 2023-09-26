import { hideMapFilter } from '../stores/map-filter-store';
import { setSelectedEntity, showMapMenu } from '../stores/map-menu-store';
import { addBaseHydratedMarker, getBaseHydratedMarkers } from '../stores/map-marker-store';
import type { HydratedMapSite } from '../+page.server';
import { getMap } from '../stores/map-store';
import { getMapMode } from '../stores/map-mode-store';
import { dropAnimation, selectedClickAnimation } from './animation-helpers';
import {
  MAP_MARKER_PIN_CLASS,
  MARKER_PINS,
  changeMarkerPin,
  getMarkerPinElement,
  isMarkerPinOfType,
} from './marker-pin-utils';

export type Marker = google.maps.marker.AdvancedMarkerElement;

export const markerClickEventListener = (
  marker: Marker,
  site: HydratedMapSite,
  PinElement: typeof google.maps.marker.PinElement,
) => {
  const content = marker.content as HTMLElement;

  showMapMenu();
  hideMapFilter();
  selectedClickAnimation(content);
  setSelectedEntity({ site, marker });

  if (getMapMode() === 'routes') {
    console.log('routes mode click');

    const pinElement = getMarkerPinElement(marker.content as HTMLElement);

    if (!isMarkerPinOfType(pinElement, MARKER_PINS.routes.type)) {
      changeMarkerPin(marker, PinElement, MARKER_PINS.routes);
    }
  }
};

interface CreateMarkerArgs {
  site: HydratedMapSite;
  map: google.maps.Map;
  AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement;
  PinElement: typeof google.maps.marker.PinElement;
  LatLng: typeof google.maps.LatLng;
  intersectionObserver: IntersectionObserver;
}

export const createMarker = ({
  site,
  map,
  AdvancedMarkerElement,
  PinElement,
  LatLng,
  intersectionObserver,
}: CreateMarkerArgs) => {
  const container = document.createElement('div');
  const icon = document.createElement('div');
  icon.innerHTML = MARKER_PINS.default.iconHtml;
  const faPin = new PinElement({
    glyph: icon,
    ...MARKER_PINS.default.pinOptions,
  });
  faPin.element.classList.add(MAP_MARKER_PIN_CLASS);
  container.appendChild(faPin.element);

  const marker = new AdvancedMarkerElement({
    map,
    position: new LatLng(site.location[0], site.location[1]),
    title: site.site_name,
    content: container,
  });

  const content = marker.content as HTMLElement;
  content.classList.add('map-marker');

  dropAnimation(content, intersectionObserver);
  content.addEventListener('click', () => markerClickEventListener(marker, site, PinElement));

  addBaseHydratedMarker({ marker: marker, site });

  return marker;
};

export const removeMarkerFromMap = (marker: Marker) => {
  marker.map = null;
};

export const addMarkerToMap = (marker: Marker) => {
  marker.map = getMap();
};

export const showAllMarkers = () => {
  getBaseHydratedMarkers().forEach(({ marker }) => addMarkerToMap(marker));
};
