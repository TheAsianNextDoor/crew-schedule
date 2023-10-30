<script lang="ts">
  import { flip } from 'svelte/animate';
  import { isMaxRouteItemsStore } from '../../stores/map-routes-store';
  import type { HydratedMapMarker } from '../../stores/map-marker-store';
  import { MARKER_PINS, changeMarkerPin } from '../../helpers/marker-pin-utils';
  import { listItemContainer } from '$lib/styles';
  import { mapMatrixStore, setMatrixDestinations } from '../../stores/map-matrix-store';

  const flipDurationMs = 100;

  const deleteItem = (item: HydratedMapMarker) => {
    const itemIdToRemove = item.id;
    setMatrixDestinations($mapMatrixStore.destinations.filter(({ id }) => id !== itemIdToRemove));
    changeMarkerPin(item.marker, MARKER_PINS.default);
  };
</script>

<div class="flex flex-col gap-y-1">
  {#each $mapMatrixStore.destinations as item (item.id)}
    <div class={`${listItemContainer}`} animate:flip={{ duration: flipDurationMs }}>
      <span>
        {item.site.site_name}
      </span>
      <button on:click={() => deleteItem(item)}>
        <i class="fa-regular fa-circle-xmark"></i>
      </button>
    </div>
  {/each}
</div>

{#if $isMaxRouteItemsStore}
  <span class="text-warning-500">At max items of 10</span>
{/if}

<style>
  .grid-container {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 25px auto;
  }
</style>
