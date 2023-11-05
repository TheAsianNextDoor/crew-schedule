<script lang="ts">
  import type { HydratedMapMarker } from '../../stores/map-marker-store';
  import { setPinToDefault } from '../../helpers/marker-pin-utils';
  import { listItemContainerStyle } from '$lib/styles';
  import { matrixSitesStore, setMatrixDestinations } from '../../stores/matrix-sites-store';
  const deleteItem = (item: HydratedMapMarker) => {
    const itemIdToRemove = item.id;
    setMatrixDestinations($matrixSitesStore.destinations.filter(({ id }) => id !== itemIdToRemove));
    setPinToDefault(item);
  };
</script>

<h2 class="h4">Destination:</h2>
<div class="flex flex-col gap-y-1">
  {#each $matrixSitesStore.destinations as item (item.id)}
    <div class={`${listItemContainerStyle}`}>
      <span>
        {item.location.content.name}
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
