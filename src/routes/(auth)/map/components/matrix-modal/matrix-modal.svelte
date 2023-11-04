<script lang="ts">
  import DraggableWindow from '$lib/components/draggable-window.svelte';
  import MatrixList from './matrix-list.svelte';
  import {
    clearMatrixDestinations,
    clearMatrixEdges,
    clearMatrixOrigin,
    getMatrixSites,
    hideMatrixCalcInfo,
    isMatrixCalcInfoVisible,
    isMaxMatrixDestinationStore,
    matrixEdges,
    matrixSitesStore,
    setMatrixEdges,
    showMatrixCalcInfo,
  } from '../../stores/matrix-sites-store';
  import MatrixCalcInfo from './matrix-calc-info.svelte';
  import type { MatrixItem } from '../../../../api/v1/auth/matrix/get-google-matrix';
  import type { fetchResult } from '$lib/utils/fetch';
  import { buildMatrixCalcPolyline } from '../../helpers/polyline-utils';
  import { addMatrixPolyline, clearMatrixPolylines } from '../../stores/matrix-polyline.store';
  import MatrixOrigin from './matrix-origin.svelte';
  import { setAllPinsToDefault } from '../../helpers/marker-pin-utils';
  import type { LatitudeLongitude } from '$lib/types/latitude-longitude';

  $: calculateButtonDisabled =
    $matrixSitesStore.origin && $matrixSitesStore.destinations.length < 2;

  const handleRouteCalculate = async () => {
    const { origin, destinations } = getMatrixSites();
    const originLocations = { lat: origin?.location.lat, lng: origin?.location.lng };
    const destinationLocations = destinations.map(({ location: { lat, lng } }) => ({ lat, lng }));
    const result = await (
      await fetch('/api/v1/auth/matrix', {
        method: 'POST',
        body: JSON.stringify({ originLocations, destinationLocations }),
      })
    ).json();

    const { data } = result as fetchResult<MatrixItem[]>;

    // populate the polylines
    data.forEach((matrixItem, index) => {
      const destination = $matrixSitesStore.destinations[matrixItem.destinationIndex];
      const locations = [
        {
          lat: origin?.location.lat,
          lng: origin?.location.lng,
        },
        {
          lat: destination?.location.lat,
          lng: destination?.location.lng,
        },
      ] as LatitudeLongitude[];
      const polyline = buildMatrixCalcPolyline(locations, matrixItem, index);
      addMatrixPolyline({
        // @ts-expect-error origin is not null
        origin,
        destination,
        polyline,
      });
    });

    setMatrixEdges(data);
    showMatrixCalcInfo();
  };

  const handleCalcAnotherRoute = () => {
    clearMatrixEdges();
    clearMatrixPolylines();
    hideMatrixCalcInfo();
  };

  const handleClear = () => {
    clearMatrixOrigin();
    clearMatrixDestinations();
    setAllPinsToDefault();
  };
</script>

<DraggableWindow
  left={document.body.clientWidth - 288 - 10}
  top={document.body.clientHeight - document.body.clientHeight / 2 - 384 / 2 - 50}
>
  <div class="bg-surface-600 text-slate-200 h4 text-center rounded-t-lg" slot="header">
    Matrix Calculation
  </div>
  <div
    class="bg-surface-100-800-token p-4 overflow-auto box-border flex flex-1 flex-col"
    slot="content"
  >
    {#if $isMatrixCalcInfoVisible}
      <MatrixCalcInfo matrices={$matrixSitesStore} edges={$matrixEdges} />
    {:else}
      <MatrixOrigin />
      <MatrixList />
    {/if}
  </div>
  <div class="text-center p-4 bg-surface-100-800-token" slot="footer">
    {#if $isMaxMatrixDestinationStore}
      <div class="text-warning-500">At max items of 10</div>
    {/if}

    {#if $isMatrixCalcInfoVisible}
      <button on:click={handleCalcAnotherRoute} class="btn btn-md variant-filled"
        >Calculate Another Route</button
      >
    {:else}
      <button
        disabled={$matrixSitesStore.destinations.length < 1 && !$matrixSitesStore.origin}
        on:click={handleClear}
        class="btn btn-md variant-filled">Clear</button
      >
      <button
        disabled={calculateButtonDisabled}
        on:click={handleRouteCalculate}
        class="btn btn-md variant-filled">Calculate</button
      >
    {/if}
  </div>
</DraggableWindow>
