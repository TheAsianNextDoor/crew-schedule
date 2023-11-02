<script lang="ts">
  import type { HydratedMapMarker } from '../../stores/map-marker-store';
  import { MARKER_PINS, changeMarkerPin } from '../../helpers/marker-pin-utils';
  import { listItemContainerStyle } from '$lib/styles';
  import { optimalSitesStore, setOptimalSites } from '../../stores/optimal-sites-store';

  const deleteItem = (item: HydratedMapMarker) => {
    const itemIdToRemove = item.id;
    setOptimalSites($optimalSitesStore.filter(({ id }) => id !== itemIdToRemove));
    changeMarkerPin(item.marker, MARKER_PINS.default);
  };
</script>

<div class="flex flex-col gap-y-1">
  {#each $optimalSitesStore as item (item.id)}
    <div class={`${listItemContainerStyle}`}>
      <span>
        {item.site.site_name}
      </span>
      <button on:click={() => deleteItem(item)}>
        <i class="fa-regular fa-circle-xmark"></i>
      </button>
    </div>
  {/each}
</div>

<style>
  .grid-container {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 25px auto;
  }
</style>
