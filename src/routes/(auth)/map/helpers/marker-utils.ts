import type Leaflet from 'leaflet';
import { get } from 'svelte/store';

import type { MapSite } from '../../map/queries/retrieve-map-sites';
import {
  hideMapMenuFilter,
  isMapMenuFilterVisible,
  isMapMenuVisible,
  setSelectedEntity,
  showMapMenu,
} from '../components/map-menu-store';

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
  site: MapSite,
  // setSiteStore: SetStoreFunction<MapItems>,
  marker: typeof Leaflet.marker,
  map: Leaflet.Map,
) => {
  // const myMarker = marker(site.location, { icon: getMarkerIcon(site) });
  const myMarker = marker(site.location as [number, number]);

  // myMarker.on('click', () => {
  //   setIsDrawerOpen(true);
  //   setSelectedMarker(site);
  // });

  myMarker
    .addTo(map)
    .bindTooltip(
      `
    Name: ${site.site_name} <br>
    Job Number: ${site.job_number} <br>
    Status: ${site.status_name} <br>
  `,
    )
    .on('click', async () => {
      if (!get(isMapMenuVisible)) {
        showMapMenu();
      }

      if (get(isMapMenuFilterVisible)) {
        hideMapMenuFilter();
      }
      // const res = await fetch(`/api/map-drawer-info/${site.site_id}`);
      // const data = await res.json();

      setSelectedEntity(site);
    });

  // setSiteStore(
  //   produce((list) => {
  //     list.push({ marker: myMarker, site });
  //   })
  // );
};
