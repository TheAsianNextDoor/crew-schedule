import type Leaflet from 'leaflet';

import { hideMapFilter, isMapFilterVisible } from '../stores/map-filter-store';
import { isMapMenuVisible, setSelectedEntity, showMapMenu } from '../stores/map-menu-store';
import { addBaseHydratedMarker, getBaseHydratedMarkers } from '../stores/map-marker-store';
import type { HydratedSite } from '../+page.server';
import type { Map, Marker } from 'leaflet';
import { getMap } from '../stores/map-store';

// const getMarkerIcon = (site: any) => {
//   const LeafIcon = L.Icon.extend({
//     options: {
//       shadowUrl: '/src/assets/marker-shadow.png',
//       iconSize: [40, 40],
//       shadowSize: [50, 50],
//       iconAnchor: [25, 40],
//       shadowAnchor: [20, 50],
//       popupAnchor: [-3, -76],
//     },
//   });

//   const redDefaultIcon = new LeafIcon({
//     iconUrl: '/src/assets/red-default.png',
//   });
//   const greenDefaultIcon = new LeafIcon({
//     iconUrl: '/src/assets/green-default.png',
//   });
//   const blueDefaultIcon = new LeafIcon({
//     iconUrl: '/src/assets/blue-default.png',
//   });

//   if (site.currentPhase?.discipline === 'concrete') {
//     return redDefaultIcon;
//   }

//   if (site.currentPhase?.discipline === 'asphalt') {
//     return greenDefaultIcon;
//   }

//   if (site.currentPhase?.discipline === 'striping') {
//     return blueDefaultIcon;
//   }

//   return redDefaultIcon;
// };

export const createMarker = (
  site: HydratedSite,
  // setSiteStore: SetStoreFunction<MapItems>,
  marker: typeof Leaflet.marker,
  map: Leaflet.Map,
) => {
  // const myMarker = marker(site.location, { icon: getMarkerIcon(site) });
  const myMarker = marker(site.location as [number, number]);

  myMarker
    .bindTooltip(
      `
    Name: ${site.site_name} <br>
    Job Number: ${site.job_number} <br>
    Status: ${site.status_name} <br>
  `,
    )
    .on('click', async () => {
      if (!isMapMenuVisible()) {
        showMapMenu();
      }

      if (isMapFilterVisible()) {
        hideMapFilter();
      }

      setSelectedEntity(site);
    });

  addBaseHydratedMarker({ marker: myMarker, site });

  myMarker.addTo(map);
};

export const removeMarker = (marker: Marker) => {
  marker.remove();
};

export const addMarker = (marker: Marker, map: Map) => {
  marker.addTo(map);
};

export const showAllMarkers = () => {
  getBaseHydratedMarkers().forEach(({ marker }) => marker.addTo(getMap()));
};
