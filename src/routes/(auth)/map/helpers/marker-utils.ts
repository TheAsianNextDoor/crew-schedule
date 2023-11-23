import {
  getBaseHydratedMarkers,
  type HydratedMapMarker,
  setSelectedHydratedMarker,
} from '../stores/map-marker-store';
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
import { addToRouteSites, isMaxRouteItemsStore } from '../stores/route-sites-store';
import {
  getGoogleMaps,
  type MapInstance,
  type PinElementInstance,
} from '$lib/constants/google-maps';
import { get } from 'svelte/store';
import {
  addToMatrixDestinations,
  getIsSelectingMatrixOrigin,
  isMaxMatrixDestinationStore,
  setIsNotSelectingMatrixOrigin,
  setMatrixOrigin,
} from '../stores/matrix-sites-store';
import { LOCATION_TYPES_ENUM } from '$lib/constants/location-types';
import type { GenericHydratedLocation } from '../+layout.server';
import { navigateWithFilterSearchParams } from './navigation-utils';
import { isMapSidebarVisible, showMapSidebar } from '../stores/sidebar-store';
import { setMarkerClickWhenSidebarClosed, setSlideAnimate } from '../stores/selected-entity-store';

export type Marker = google.maps.marker.AdvancedMarkerElement;

export const markerClickEventListener = (hydratedMapMarker: HydratedMapMarker) => {
  const { marker, location } = hydratedMapMarker;
  const content = marker.content as HTMLElement;

  if (location.type === LOCATION_TYPES_ENUM.site) {
    navigateWithFilterSearchParams(`/map?selected-location=${location.location_id}`);
  } else if (location.type === LOCATION_TYPES_ENUM.mobilizationHub) {
    navigateWithFilterSearchParams(`/map?selected-location=${location.location_id}`);
  }

  selectedClickAnimation(content);
  setSelectedHydratedMarker(hydratedMapMarker);

  if (!isMapSidebarVisible()) {
    setSlideAnimate();
    setMarkerClickWhenSidebarClosed();
    showMapSidebar();
  }

  const mapMode = getMapMode();
  if (mapMode === 'routes') {
    const pinElement = getMarkerPinElement(marker.content as HTMLElement);

    if (!isMarkerPinOfType(pinElement, MARKER_PINS.routes.type) && !get(isMaxRouteItemsStore)) {
      addToRouteSites(hydratedMapMarker);
      changeMarkerPin(marker, MARKER_PINS.routes);
    }

    return;
  }

  if (mapMode === 'matrix') {
    const pinElement = getMarkerPinElement(marker.content as HTMLElement);

    if (getIsSelectingMatrixOrigin()) {
      setIsNotSelectingMatrixOrigin();
      changeMarkerPin(marker, MARKER_PINS.matrixOrigin);
      setMatrixOrigin(hydratedMapMarker);
    } else if (
      !isMarkerPinOfType(pinElement, MARKER_PINS.matrixDestination.type) &&
      !get(isMaxMatrixDestinationStore)
    ) {
      addToMatrixDestinations(hydratedMapMarker);
      changeMarkerPin(marker, MARKER_PINS.matrixDestination);
    }
  }

  return;
};

interface CreateMarkerArgs {
  location: GenericHydratedLocation;
  map: MapInstance;
  intersectionObserver?: IntersectionObserver;
}

export const createMarker = ({ location, map, intersectionObserver }: CreateMarkerArgs) => {
  const { AdvancedMarkerElement, PinElement, LatLng } = getGoogleMaps();

  const container = document.createElement('div');
  const icon = document.createElement('div');
  let faPin: PinElementInstance;

  if (location.type === LOCATION_TYPES_ENUM.site) {
    icon.innerHTML = MARKER_PINS.site.iconHtml;
    faPin = new PinElement({
      glyph: icon,
      ...MARKER_PINS.site.pinOptions,
    });
  } else if (location.type === LOCATION_TYPES_ENUM.mobilizationHub) {
    icon.innerHTML = MARKER_PINS.mobilizationHub.iconHtml;
    faPin = new PinElement({
      glyph: icon,
      ...MARKER_PINS.mobilizationHub.pinOptions,
    });
  } else {
    console.error('unknown location type');
    icon.innerHTML = MARKER_PINS.site.iconHtml;
    faPin = new PinElement({
      glyph: icon,
      ...MARKER_PINS.site.pinOptions,
    });
  }

  faPin.element.classList.add(MAP_MARKER_PIN_CLASS);
  container.appendChild(faPin.element);

  const marker = new AdvancedMarkerElement({
    map,
    position: new LatLng(location.lat, location.lng),
    title: location.content.name,
    content: container,
  });
  const hydratedMapMarker = { id: location.content.id, marker, location };

  const content = marker.content as HTMLElement;
  content.classList.add('map-marker');
  content.addEventListener('click', () => markerClickEventListener(hydratedMapMarker));

  if (intersectionObserver) {
    dropAnimation(content, intersectionObserver);
  }

  return hydratedMapMarker;
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
