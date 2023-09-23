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

export type Marker = google.maps.marker.AdvancedMarkerElement;

const addBaseMarkerFunctionality = (marker: Marker) => {
  const content = marker.content as HTMLElement;
  content.style.cursor = 'pointer';
};

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
  content.style.cursor = 'pointer';
  // content.addEventListener('click', () => markerClickEventListener(marker, site));
};

const selectedMarkerClickEventListener = (marker: Marker, site: HydratedMapSite) => {
  if (!isMapMenuVisible()) {
    showMapMenu();
  }

  if (isMapFilterVisible()) {
    hideMapFilter();
  }

  const content = marker.content as HTMLElement;

  const previouslySelected = getSelectedEntity();
  if (previouslySelected) {
    const previousContent = previouslySelected.marker.content as HTMLElement;
    previousContent.style.animationName = '';
  }

  content.offsetWidth;
  content.style.animation = 'bounce .75s linear 0s 3';
  setTimeout(() => {
    content.style.animation = '';
  }, 2250);

  setSelectedEntity({ site, marker });
};

const dropAnimation = (content: HTMLElement, intersectionObserver: IntersectionObserver) => {
  content.style.opacity = '0';
  content.addEventListener('animationend', () => {
    content.classList.remove('drop');
    content.style.opacity = '1';
  });
  const time = Math.random(); // delay for easy to see the animation
  content.style.setProperty('--delay-time', time + 's');
  intersectionObserver.observe(content);
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
    glyphColor: 'red',
    background: '#FFD514',
    borderColor: '#ff8300',
  });

  const marker = new AdvancedMarkerElement({
    map,
    position: new LatLng(site.location[0], site.location[1]),
    title: site.site_name,
    content: faPin.element,
  });

  const content = marker.content as HTMLElement;

  addBaseMarkerFunctionality(marker);
  dropAnimation(content, intersectionObserver);
  content.addEventListener('click', () => selectedMarkerClickEventListener(marker, site));

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
