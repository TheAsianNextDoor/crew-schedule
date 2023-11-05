import { getGoogleMaps } from '$lib/constants/google-maps';
import { LOCATION_TYPES_ENUM } from '$lib/constants/location-types';
import { getBaseHydratedMarkers, type HydratedMapMarker } from '../stores/map-marker-store';
import type { Marker } from './marker-utils';

export const MAP_MARKER_PIN_CLASS = 'map-marker-pin';

export type PinOptions = Omit<google.maps.marker.PinElementOptions, 'glyph'>;

type MarkerPinTypes =
  | 'site'
  | 'mobilizationHub'
  | 'routes'
  | 'matrixDestination'
  | 'matrixOrigin'
  | 'optimal';

interface PinElementConfig {
  type: MarkerPinTypes;
  iconHtml: string;
  pinOptions: PinOptions;
}

const borderColor = '#808080';

export const MARKER_PINS: Record<MarkerPinTypes, PinElementConfig> = {
  site: {
    type: 'site',
    iconHtml: '<i class="fa-solid fa-circle"></i>',
    pinOptions: {
      glyphColor: 'white',
      background: '#5F8EE7', // blue
      borderColor,
    },
  },
  mobilizationHub: {
    type: 'mobilizationHub',
    iconHtml: '<i class="fa-solid fa-house"></i>',
    pinOptions: {
      glyphColor: 'white',
      background: '#E75F5F', // red
      borderColor,
    },
  },
  routes: {
    type: 'routes',
    iconHtml: '<i class="fa-solid fa-road fa-lg"></i>',
    pinOptions: {
      glyphColor: 'black',
      background: '#e7dc5f', // yellow
      borderColor,
    },
  },
  matrixOrigin: {
    type: 'matrixOrigin',
    iconHtml: '<i class="fa-brands fa-xing"></i>',
    pinOptions: {
      glyphColor: 'white',
      background: '#5FE764', // orange
      borderColor,
    },
  },
  matrixDestination: {
    type: 'matrixDestination',
    iconHtml: '<i class="fa-brands fa-xing"></i>',
    pinOptions: {
      glyphColor: 'white',
      background: '#e7985f', // green
      borderColor,
    },
  },
  optimal: {
    type: 'optimal',
    iconHtml: '<i class="fa-solid fa-wand-magic-sparkles"></i>',
    pinOptions: {
      glyphColor: 'white',
      background: '#E75F5F',
      borderColor,
    },
  },
} as const;

export const getMarkerPinElement = (node: HTMLElement) => {
  const pinElement = node.querySelector(`.${MAP_MARKER_PIN_CLASS}`);

  if (!pinElement) {
    console.error('missing pinElement');
    return;
  }

  return pinElement as HTMLElement;
};

export const changeMarkerPin = (marker: Marker, pinDefinition: PinElementConfig) => {
  const { PinElement } = getGoogleMaps();
  const icon = document.createElement('div');
  icon.innerHTML = pinDefinition.iconHtml;
  const faPin = new PinElement({
    glyph: icon,
    ...pinDefinition.pinOptions,
  });
  faPin.element.classList.add(MAP_MARKER_PIN_CLASS);
  faPin.element.dataset.pin_type = pinDefinition.type;

  const pinElement = getMarkerPinElement(marker.content as HTMLElement);
  pinElement?.replaceWith(faPin.element);
};

export const isMarkerPinOfType = (pinElement: HTMLElement | undefined, type: string) =>
  pinElement?.dataset?.pin_type === type;

export const setPinToDefault = ({ marker, location: { type } }: HydratedMapMarker) => {
  if (type === LOCATION_TYPES_ENUM.site) changeMarkerPin(marker, MARKER_PINS.site);
  if (type === LOCATION_TYPES_ENUM.mobilizationHub)
    changeMarkerPin(marker, MARKER_PINS.mobilizationHub);
};

export const setAllPinsToDefault = () => {
  getBaseHydratedMarkers().forEach(setPinToDefault);
};
