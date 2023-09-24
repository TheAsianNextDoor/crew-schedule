import { hideMapFilter } from '../stores/map-filter-store';
import { hideMapMenu, setSelectedEntity, showMapMenu } from '../stores/map-menu-store';
import { addBaseHydratedMarker, getBaseHydratedMarkers } from '../stores/map-marker-store';
import type { HydratedMapSite } from '../+page.server';
import { getMap } from '../stores/map-store';
import { getMapMode } from '../stores/map-mode-store';
import { dropAnimation, selectedClickAnimation } from './animation-helpers';

export type Marker = google.maps.marker.AdvancedMarkerElement;

const routeClickEventListener = (
  marker: Marker,
  PinElement: typeof google.maps.marker.PinElement,
) => {
  const icon = document.createElement('div');
  icon.innerHTML = '<i class="fa-solid fa-trowel fa-beat-fade"></i>';
  const faPin = new PinElement({
    glyph: icon,
    glyphColor: 'red',
    background: 'blue',
    borderColor: '#ff8300',
  });
  marker.content = faPin.element;

  const content = marker.content as HTMLElement;
  // content.addEventListener('click', () => markerClickEventListener(marker, site));
};

const markerClickEventListener = (marker: Marker, site: HydratedMapSite) => {
  if (getMapMode() === 'base') {
    showMapMenu();
    hideMapFilter();

    selectedClickAnimation(marker.content as HTMLElement);

    setSelectedEntity({ site, marker });
  } else if (getMapMode() === 'routes') {
    showMapMenu();
    hideMapFilter();
  } else {
    console.error('unknown map mode');
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
  const icon = document.createElement('div');
  icon.innerHTML = '<i class="fa-solid fa-trowel fa-beat-fade"></i>';
  const faPin = new PinElement({
    glyph: icon,
    glyphColor: 'white',
    background: 'rgb(95, 142, 231)',
    borderColor: 'rgb(230, 221, 102)',
  });

  const marker = new AdvancedMarkerElement({
    map,
    position: new LatLng(site.location[0], site.location[1]),
    title: site.site_name,
    content: faPin.element,
  });

  const content = marker.content as HTMLElement;
  content.classList.add('map-icon');

  dropAnimation(content, intersectionObserver);
  content.addEventListener('click', () => markerClickEventListener(marker, site));

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
