<script lang="ts">
  import { onMount } from 'svelte';

  import { createMarker } from '../helpers/marker-utils';
  import type { HydratedMapSite } from '../proxy+page.server';
  import { getBaseHydratedMarkers, setFilteredHydratedMarkers } from '../stores/map-marker-store';
  import { setMap } from '../stores/map-store';

  export let sites: HydratedMapSite[];
  export let Map: typeof google.maps.Map;
  export let AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement;
  export let PinElement: typeof google.maps.marker.PinElement;
  export let LatLng: typeof google.maps.LatLng;

  let mapElement: HTMLDivElement;

  const intersectionObserver = new window.IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('drop');
        intersectionObserver.unobserve(entry.target);
      }
    }
  });

  onMount(async () => {
    try {
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

      sites.map((site) =>
        createMarker({
          site,
          map,
          AdvancedMarkerElement,
          PinElement,
          LatLng,
          intersectionObserver,
        }),
      );

      setFilteredHydratedMarkers(getBaseHydratedMarkers());
    } catch (e) {
      console.log(e);
    }
  });
</script>

<div class="h-full" bind:this={mapElement} />
