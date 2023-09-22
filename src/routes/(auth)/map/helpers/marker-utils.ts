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

const markerClickEventListener = (marker: Marker, site: HydratedMapSite) => {
  if (!isMapMenuVisible()) {
    showMapMenu();
  }

  if (isMapFilterVisible()) {
    hideMapFilter();
  }

  const content = marker.content as HTMLElement;

  const previouslySelected = getSelectedEntity();
  if (previouslySelected) {
    // buggy and not working
    previouslySelected.marker.style.animationName = 'bounce';
    previouslySelected.marker.style.animationPlayState = 'paused';
  }

  content.style.animation = '';
  content.offsetWidth;
  content.style.animation = 'bounce .75s linear 0s 3';

  setSelectedEntity({ site, marker });
};

const dropAnimation = (content: HTMLElement) => {
  content.style.cssText = 'cursor: pointer';
  content.style.opacity = '0';
  content.addEventListener('animationend', () => {
    content.classList.remove('drop');
    content.style.opacity = '1';
  });
  const time = Math.random(); // delay for easy to see the animation
  content.style.setProperty('--delay-time', time + 's');
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
  // const icon = document.createElement('div');
  // icon.style.cssText = 'cursor: pointer;';
  // icon.innerHTML = `<i class="fa fa-pizza-slice fa-lg"></i>`;
  // const faPin = new PinElement({
  //   glyph: icon,
  //   glyphColor: '#ff8300',
  //   background: '#FFD514',
  //   borderColor: '#ff8300',
  // });

  const marker = new AdvancedMarkerElement({
    map,
    position: new LatLng(site.location[0], site.location[1]),
    title: site.site_name,
  });

  const content = marker.content as HTMLElement;
  dropAnimation(content);
  intersectionObserver.observe(content);

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
