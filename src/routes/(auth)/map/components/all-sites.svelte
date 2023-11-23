<script lang="ts">
  import { selectedClickAnimation } from '../helpers/animation-helpers';
  import {
    MARKER_PINS,
    changeMarkerPin,
    setPinToDefault,
    setPinToSelected,
  } from '../helpers/marker-pin-utils';
  import { navigateWithFilterSearchParams } from '../helpers/navigation-utils';
  import type { HydratedSiteLocation } from '../proxy+layout.server';
  import { getBaseHydratedMarkers, getSelectedHydratedMarker } from '../stores/map-marker-store';

  export let siteLocations: HydratedSiteLocation[];

  const handleSiteClick = (locationId: string) => {
    navigateWithFilterSearchParams(`/map?selected-location=${locationId}`);
    const clickedHydratedMarker = getBaseHydratedMarkers().find(
      ({ location: { location_id } }) => location_id === locationId,
    );

    if (!clickedHydratedMarker) {
      console.error('missing site');

      return;
    }

    const content = clickedHydratedMarker.marker.content as HTMLElement;
    selectedClickAnimation(content);
    setPinToSelected(clickedHydratedMarker.marker);
  };

  const handleSiteMouseEnter = (locationId: string) => {
    const hoveredHydratedMarker = getBaseHydratedMarkers().find(
      ({ location: { location_id } }) => location_id === locationId,
    );

    if (!hoveredHydratedMarker) {
      return;
    }

    changeMarkerPin(hoveredHydratedMarker.marker, MARKER_PINS.selected);
  };

  const handleSiteMouseLeave = (locationId: string) => {
    const hoveredHydratedMarker = getBaseHydratedMarkers().find(
      ({ location: { location_id } }) => location_id === locationId,
    );

    if (!hoveredHydratedMarker) {
      return;
    }

    if (hoveredHydratedMarker.id !== getSelectedHydratedMarker()?.id) {
      setPinToDefault(hoveredHydratedMarker);
    }
  };
</script>

<div class="pt-16" />
{#each siteLocations as location}
  <div
    on:keydown={() => {}}
    role="button"
    tabindex={0}
    class="p-4 hover:bg-slate-200 cursor-pointer"
    on:click={() => handleSiteClick(location.location_id)}
    on:mouseenter={() => handleSiteMouseEnter(location.location_id)}
    on:mouseleave={() => handleSiteMouseLeave(location.location_id)}
  >
    <h2 class="h5">
      {location.content.name} <span class="font-normal">({location.content.job_number})</span>
    </h2>
    <p>{location.content.client_name} | {location.content.status_name}</p>
    <p>
      {location.content.phases.length} phases | {location.shortAddress}
    </p>
    <p>{location.content.phases.map(({ discipline_name }) => discipline_name).join(' | ')}</p>
  </div>
  <hr />
{/each}
