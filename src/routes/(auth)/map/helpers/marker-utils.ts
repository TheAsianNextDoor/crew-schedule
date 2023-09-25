import { hideMapFilter } from '../stores/map-filter-store';
import { setSelectedEntity, showMapMenu } from '../stores/map-menu-store';
import { addBaseHydratedMarker, getBaseHydratedMarkers } from '../stores/map-marker-store';
import type { HydratedMapSite } from '../+page.server';
import { getMap } from '../stores/map-store';
import { getMapMode } from '../stores/map-mode-store';
import { dropAnimation, selectedClickAnimation } from './animation-helpers';

export type Marker = google.maps.marker.AdvancedMarkerElement;

const changeMarkerPin = ({
  marker,
  PinElement,
  iconHtml,
  pinColor,
}: {
  marker: Marker;
  PinElement: typeof google.maps.marker.PinElement;
  iconHtml: string;
  pinColor: {
    glyphColor?: string;
    background?: string;
    borderColor?: string;
  };
}) => {
  const icon = document.createElement('div');
  icon.innerHTML = iconHtml;
  const faPin = new PinElement({
    glyph: icon,
    ...pinColor,
  });
  faPin.element.classList.add('icon');
  faPin.element.dataset.color = 'yellow';
  (marker.content as HTMLElement).querySelector('.icon')?.replaceWith(faPin.element);
};

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

    const iconElement = content.querySelector('.icon') as HTMLElement;
    if (iconElement.dataset?.color !== 'yellow') {
      changeMarkerPin({
        marker,
        iconHtml: '<i class="fa-solid fa-trowel fa-beat-fade"></i>',
        pinColor: {
          glyphColor: 'black',
          background: 'yellow',
          borderColor: 'black',
        },
        PinElement,
      });
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
  icon.innerHTML = '<i class="fa-solid fa-trowel fa-beat-fade"></i>';
  const faPin = new PinElement({
    glyph: icon,
    glyphColor: 'white',
    background: 'rgb(95, 142, 231)',
    borderColor: 'rgb(230, 221, 102)',
  });
  faPin.element.classList.add('icon');
  container.appendChild(faPin.element);

  const marker = new AdvancedMarkerElement({
    map,
    position: new LatLng(site.location[0], site.location[1]),
    title: site.site_name,
    content: container,
  });

  const content = marker.content as HTMLElement;
  content.classList.add('map-icon');

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
