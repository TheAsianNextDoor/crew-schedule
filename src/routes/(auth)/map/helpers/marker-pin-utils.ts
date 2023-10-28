import { getGoogleMaps } from '$lib/constants/google-maps';
import type { Marker } from './marker-utils';

export const MAP_MARKER_PIN_CLASS = 'map-marker-pin';

export type PinOptions = Omit<google.maps.marker.PinElementOptions, 'glyph'>;

type MarkerPinTypes = 'default' | 'routes' | 'matrix';

interface PinElementConfig {
  type: string;
  iconHtml: string;
  pinOptions: PinOptions;
}

const borderColor = '#808080';

export const MARKER_PINS: Record<MarkerPinTypes, PinElementConfig> = {
  default: {
    type: 'default',
    iconHtml: '<i class="fa-solid fa-circle"></i>',
    pinOptions: {
      glyphColor: 'white',
      background: '#5F8EE7',
      borderColor,
    },
  },
  routes: {
    type: 'routes',
    iconHtml: '<i class="fa-solid fa-road fa-lg"></i>',
    pinOptions: {
      glyphColor: 'black',
      background: '#e7dc5f',
      borderColor,
    },
  },
  matrix: {
    type: 'matrix',
    iconHtml: '<i class="fa-brands fa-xing"></i>',
    pinOptions: {
      glyphColor: 'white',
      background: '#e7985f',
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
