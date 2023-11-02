<script lang="ts">
  import { flip } from 'svelte/animate';
  import { getRouteSites, routeSitesStore, setRouteSites } from '../../stores/route-sites-store';
  import type { HydratedMapMarker } from '../../stores/map-marker-store';
  import { MARKER_PINS, changeMarkerPin } from '../../helpers/marker-pin-utils';
  import DraggableList from '$lib/components/draggable-list.svelte';
  import { listItemContainerStyle } from '$lib/styles';

  const flipDurationMs = 100;

  const deleteItem = (item: HydratedMapMarker) => {
    const itemIdToRemove = item.id;
    setRouteSites(getRouteSites().filter(({ id }) => id !== itemIdToRemove));
    changeMarkerPin(item.marker, MARKER_PINS.default);
  };
</script>

<div class="grid-container">
  <div class="flex flex-col gap-y-1">
    {#each $routeSitesStore as _, i}
      <div class="flex items-center h-10">
        <span>{i + 1}:</span>
      </div>
    {/each}
  </div>
  <DraggableList
    items={$routeSitesStore}
    considerFunction={setRouteSites}
    finalizeFunction={setRouteSites}
  >
    {#each $routeSitesStore as item (item.id)}
      <div
        class={`${listItemContainerStyle} cursor-grab`}
        animate:flip={{ duration: flipDurationMs }}
      >
        <span>
          {item.site.site_name}
        </span>
        <button on:click={() => deleteItem(item)}>
          <i class="fa-regular fa-circle-xmark"></i>
        </button>
      </div>
    {/each}
  </DraggableList>
</div>

<style>
  .grid-container {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 25px auto;
  }
</style>
