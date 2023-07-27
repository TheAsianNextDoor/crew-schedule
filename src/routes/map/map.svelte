<script lang="ts">
  import { browser } from '$app/environment';
  import type { Map } from 'leaflet';
  import { onDestroy, onMount } from 'svelte';

  let mapElement: HTMLDivElement;
  let map: Map;

  onMount(async () => {
    if (browser) {
      const leaflet = await import('leaflet');

      map = leaflet.map(mapElement).setView([51.505, -0.09], 13);

      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        })
        .addTo(map);

      // const populatedSites = siteList.map((site) => ({
      //   ...site,
      //   currentPhase: phases.find((phase) => phase.phaseId === site.currentPhaseId) || null,
      // }));

      // populatedSites.forEach((site) => {
      //   createMarker(site, setSiteStore, map);
      // });
    }
  });

  onDestroy(async () => {
    if (map) {
      console.log('Unloading Leaflet map.');
      map.remove();
    }
  });
</script>

<div bind:this={mapElement} />

<style>
  @import 'leaflet/dist/leaflet.css';
  div {
    height: 100%;
  }
</style>
