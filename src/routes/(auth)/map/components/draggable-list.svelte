<script lang="ts">
  import { flip } from 'svelte/animate';
  import { dndzone, type DndEvent } from 'svelte-dnd-action';
  import { mapRoutesSubscribe, setMapRoutes } from '../stores/map-routes-store';
  import { onDestroy } from 'svelte';
  import type { HydratedMapMarker } from '../stores/map-marker-store';
  import { MARKER_PINS, changeMarkerPin } from '../helpers/marker-pin-utils';
  import { getGoogleMaps } from '$lib/constants/google-maps';

  let items: HydratedMapMarker[] = [];

  const mapRoutesUnsub = mapRoutesSubscribe((val) => {
    items = val;
  });
  onDestroy(mapRoutesUnsub);

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
    setMapRoutes(items.filter(({ id }) => id !== itemIdToRemove));
    changeMarkerPin(item.marker, getGoogleMaps().PinElement, MARKER_PINS.default);
  };
</script>

<div class="grid-container w-full h-full">
  <div class="flex flex-col flex-y-1">
    {#each items as _, i}
      <div class="flex items-center h-10">
        <span>{i}:</span>
      </div>
    {/each}
  </div>
  <section
    class="flex flex-col gap-y-1 mr-4"
    use:dndzone={{ items, flipDurationMs }}
    on:consider={handleDndConsider}
    on:finalize={handleDndFinalize}
  >
    {#each items as item (item.id)}
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

<style>
  .grid-container {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 25px auto;
  }
</style>
