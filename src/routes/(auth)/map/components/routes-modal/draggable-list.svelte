<script lang="ts">
  import { flip } from 'svelte/animate';
  import { dndzone, type DndEvent } from 'svelte-dnd-action';
  import {
    isMaxRouteItemsStore,
    mapRoutesStore,
    setMapRoutes,
  } from '../../stores/map-routes-store';
  import type { HydratedMapMarker } from '../../stores/map-marker-store';
  import { MARKER_PINS, changeMarkerPin } from '../../helpers/marker-pin-utils';
  import { getGoogleMaps } from '$lib/constants/google-maps';

  const flipDurationMs = 100;

  const handleDndConsider = <T,>(
    e: CustomEvent<DndEvent<HydratedMapMarker>> & { target: EventTarget & T },
  ) => {
    const newOrderedList = e.detail.items;
    setMapRoutes(newOrderedList);
  };

  const handleDndFinalize = <T,>(
    e: CustomEvent<DndEvent<HydratedMapMarker>> & { target: EventTarget & T },
  ) => {
    const newOrderedList = e.detail.items;
    setMapRoutes(newOrderedList);
  };

  const deleteItem = (item: HydratedMapMarker) => {
    const itemIdToRemove = item.id;
    setMapRoutes($mapRoutesStore.filter(({ id }) => id !== itemIdToRemove));
    changeMarkerPin(item.marker, getGoogleMaps().PinElement, MARKER_PINS.default);
  };
</script>

<div class="grid-container">
  <div class="flex flex-col gap-y-1">
    {#each $mapRoutesStore as _, i}
      <div class="flex items-center h-10">
        <span>{i + 1}:</span>
      </div>
    {/each}
  </div>
  <section
    class="flex flex-col gap-y-1"
    use:dndzone={{ items: $mapRoutesStore, flipDurationMs }}
    on:consider={handleDndConsider}
    on:finalize={handleDndFinalize}
  >
    {#each $mapRoutesStore as item (item.id)}
      <div
        class="card shadow-lg cursor-grab border items-center justify-between flex px-2 h-10 border-black bg-slate-300"
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
  </section>
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
