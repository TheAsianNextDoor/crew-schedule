import type Leaflet from 'leaflet';

import { hideMapFilter, isMapFilterVisible } from '../stores/map-filter-store';
import {
  getSelectedEntity,
  isMapMenuVisible,
  setSelectedEntity,
  showMapMenu,
} from '../stores/map-menu-store';
import { addBaseHydratedMarker, getBaseHydratedMarkers } from '../stores/map-marker-store';
import type { HydratedMapSite } from '../+page.server';
import type { Marker } from 'leaflet';
import { getMap } from '../stores/map-store';

const createIcon = (leafletInstance: typeof Leaflet, iconUrl: string) => {
  const LeafIcon = leafletInstance.Icon.extend({
    options: {
      shadowUrl: '/src/lib/images/marker-shadow.png',
      iconSize: [40, 40],
      shadowSize: [50, 50],
      iconAnchor: [25, 40],
      shadowAnchor: [20, 50],
      popupAnchor: [-3, -76],
    },
  });

  // @ts-ignore
  return new LeafIcon({ iconUrl });
};

export const createMarker = (
  site: HydratedMapSite,
  markerFunc: typeof Leaflet.marker,
  map: Leaflet.Map,
  leafletInstance: typeof Leaflet,
) => {
  const defaultIcon = createIcon(leafletInstance, '/src/lib/images/default-marker.png');
  // const selectedIcon = createIcon(leafletInstance, '/src/lib/images/selected-marker.gif');

  const marker = markerFunc(site.location as [number, number], { icon: defaultIcon });

  marker
    // .bindTooltip(
    //   `
    //   Name: ${site.site_name} <br>
    //   Job Number: ${site.job_number} <br>
    //   Status: ${site.status_name} <br>
    // `,
    // )
    .on('click', async (e) => {
      if (!isMapMenuVisible()) {
        showMapMenu();
      }

      if (isMapFilterVisible()) {
        hideMapFilter();
      }

      // @ts-ignore
      getSelectedEntity()?.marker?.stopBouncing();
      e.target.bounce(4);

      setSelectedEntity({ site, marker });
    });

  addBaseHydratedMarker({ marker: marker, site });

  marker.addTo(map);
};

export const removeMarkerFromMap = (marker: Marker) => {
  marker.remove();
};

export const addMarkerToMap = (marker: Marker) => {
  marker.addTo(getMap());
};

export const showAllMarkers = () => {
  getBaseHydratedMarkers().forEach(({ marker }) => marker.addTo(getMap()));
};
