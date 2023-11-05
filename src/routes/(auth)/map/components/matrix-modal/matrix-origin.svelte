<script lang="ts">
  import { listItemContainerStyle } from '$lib/styles';
  import { MARKER_PINS, changeMarkerPin, setPinToDefault } from '../../helpers/marker-pin-utils';
  import type { Marker } from '../../helpers/marker-utils';
  import {
    clearMatrixOrigin,
    getMatrixOrigin,
    isSelectingMatrixOrigin,
    matrixSitesStore,
    setIsNotSelectingMatrixOrigin,
    toggleSelectingMatrixOrigin,
  } from '../../stores/matrix-sites-store';

  const handleOriginRemove = () => {
    const origin = getMatrixOrigin();

    setIsNotSelectingMatrixOrigin();
    if (origin) {
      setPinToDefault(origin);
    }
    clearMatrixOrigin();
  };
</script>

<h2 class="h4">Origin:</h2>
{#if $matrixSitesStore.origin}
  <div class={`${listItemContainerStyle}`}>
    {$matrixSitesStore.origin.location.content.name}
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
