<script lang="ts">
  import { listItemContainerStyle } from '$lib/styles';
  import { MARKER_PINS, changeMarkerPin } from '../../helpers/marker-pin-utils';
  import type { Marker } from '../../helpers/marker-utils';
  import {
    clearMatrixOrigin,
    getMatrixOrigin,
    isSelectingMatrixOrigin,
    mapMatrixStore,
    setIsNotSelectingMatrixOrigin,
    toggleSelectingMatrixOrigin,
  } from '../../stores/map-matrix-store';

  const handleOriginRemove = () => {
    setIsNotSelectingMatrixOrigin();
    changeMarkerPin(getMatrixOrigin()?.marker as Marker, MARKER_PINS.default);
    clearMatrixOrigin();
  };
</script>

<h2 class="h4">Origin:</h2>
{#if $mapMatrixStore.origin}
  <div class={`${listItemContainerStyle}`}>
    {$mapMatrixStore.origin.site.site_name}
    <button on:click={handleOriginRemove}>
      <i class="fa-regular fa-circle-xmark"></i>
    </button>
  </div>
{:else}
  <button
    class={`!justify-center ${listItemContainerStyle} ${
      $isSelectingMatrixOrigin ? '!bg-green-500' : ''
    }`}
    on:click={toggleSelectingMatrixOrigin}
  >
    <i class="fa-solid fa-plus"></i>
    <span class="px-2"> Set Origin </span>
  </button>
{/if}
