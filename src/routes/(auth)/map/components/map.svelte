<script lang="ts">
  import { onMount } from 'svelte';

  import { createMarker } from '../helpers/marker-utils';
  import type { HydratedLocation } from '../proxy+page.server';
  import { getBaseHydratedMarkers, setFilteredHydratedMarkers } from '../stores/map-marker-store';
  import { setMap } from '../stores/map-store';
  import { PUBLIC_GOOGLE_MAP_ID } from '$env/static/public';
  import { getGoogleMaps } from '$lib/constants/google-maps';
  import { setInfoWindow } from '../stores/info-window-store';

  export let locations: HydratedLocation[];

  const { Map, InfoWindow } = getGoogleMaps();

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
      setInfoWindow(new InfoWindow());
      const map = new Map(mapElement, {
        center: {
          lat: 51.505,
          lng: -0.15,
        },
        zoom: 12,
        mapId: PUBLIC_GOOGLE_MAP_ID,
        clickableIcons: false,
        mapTypeControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM,
        },
        fullscreenControl: false,
      });
      setMap(map);

      setTimeout(() => {
        locations.map((location) =>
          createMarker({
            location,
            map,
            intersectionObserver,
          }),
        );

        setFilteredHydratedMarkers(getBaseHydratedMarkers());
      }, 800);
    } catch (e) {
      console.log(e);
    }
  });
</script>

<div class="h-full" bind:this={mapElement} />
