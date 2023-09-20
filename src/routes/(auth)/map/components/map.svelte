<script lang="ts">
  import { browser } from '$app/environment';
  import { Loader } from '@googlemaps/js-api-loader';
  import { onMount } from 'svelte';

  import { createMarker, type Map } from '../helpers/marker-utils';
  import type { HydratedMapSite } from '../proxy+page.server';
  import { getBaseHydratedMarkers, setFilteredHydratedMarkers } from '../stores/map-marker-store';
  import { setMap } from '../stores/map-store';
  import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';

  export let sites: HydratedMapSite[];

  let mapElement: HTMLDivElement;
  let map: Map;

  onMount(async () => {
    if (browser) {
      const loader = new Loader({
        apiKey: PUBLIC_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places'],
      });

      try {
        const { Map, InfoWindow } = await loader.importLibrary('maps');

        const infoWindow = new InfoWindow();

        const options: google.maps.MapOptions = {
          center: {
            lat: 51.505,
            lng: -0.15,
          },
          zoom: 12,
          mapId: 'map',
        };

        const map = new Map(mapElement, options);
        setMap(map);

        sites.forEach((site) => {
          createMarker({ site, map, infoWindow });
        });

        setFilteredHydratedMarkers(getBaseHydratedMarkers());
      } catch (e) {
        console.log(e);
      }
    }
  });
</script>

<div class="h-full" bind:this={mapElement} />
