<script lang="ts">
  import { browser } from '$app/environment';
  import type { Map } from 'leaflet';
  import { onDestroy, onMount } from 'svelte';

  import { createMarker } from '../helpers/marker-utils';
  import type { HydratedMapSite } from '../proxy+page.server';
  import { getBaseHydratedMarkers, setFilteredHydratedMarkers } from '../stores/map-marker-store';
  import { setMap } from '../stores/map-store';

  export let sites: HydratedMapSite[];

  let mapElement: HTMLDivElement;
  let map: Map;

  onMount(async () => {
    if (browser) {
      const leaflet = await import('leaflet');
      // https://github.com/hosuaby/Leaflet.SmoothMarkerBouncing
      // @ts-ignore
      await import('leaflet.smooth_marker_bouncing');

      map = leaflet.map(mapElement, { zoomControl: false }).setView([51.505, -0.09], 12);
      setMap(map);

      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        })
        .addTo(map);

      sites.forEach((site) => {
        createMarker(site, leaflet.marker, map, leaflet);
      });

      setFilteredHydratedMarkers(getBaseHydratedMarkers());
    }
  });

  onDestroy(async () => {
    if (map) {
      console.log('Unloading Leaflet map.');
      map.remove();
    }
  });
</script>

<div class="h-full" bind:this={mapElement} />

<style>
  @import 'leaflet/dist/leaflet.css';
</style>
