<script lang="ts">
  import DraggableWindow from '$lib/components/draggable-window.svelte';
  import { clearRoutePolylines } from '../../stores/route-polyline-store';
  import MatrixList from './matrix-list.svelte';
  import {
    getMatrixSites,
    isMaxMatrixDestinationStore,
    matrixSitesStore,
  } from '../../stores/matrix-sites-store';
  import MatrixCalcInfo from './matrix-calc-info.svelte';
  import type { MatrixItem } from '../../../../api/v1/auth/matrix/get-google-matrix';
  import type { fetchResult } from '$lib/utils/fetch';
  import { buildMatrixCalcPolyline } from '../../helpers/polyline-utils';
  import type { Location } from '$lib/constants/google-maps';
  import { addMatrixPolyline } from '../../stores/matrix-polyline.store';
  import MatrixOrigin from './matrix-origin.svelte';

  $: calculateButtonDisabled =
    $matrixSitesStore.origin && $matrixSitesStore.destinations.length < 2;

  let edges: MatrixItem[] = [];
  let showCalcInfo = false;

  const handleRouteCalculate = async () => {
    const { origin, destinations } = getMatrixSites();
    const originLocations = [origin?.site.location];
    const destinationLocations = destinations.map(({ site }) => site.location);
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
      const locations = [origin?.site.location, destination.site.location] as unknown as Location[];
      const polyline = buildMatrixCalcPolyline(locations, matrixItem, index);
      addMatrixPolyline({
        // @ts-expect-error origin is not null
        origin,
        destination,
        polyline,
      });
    });

    edges = data;
    showCalcInfo = true;
  };

  const handleCalcAnotherRoute = () => {
    edges = [];
    clearRoutePolylines();
    showCalcInfo = false;
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
    {#if !showCalcInfo}
      <MatrixOrigin />
      <MatrixList />
    {:else}
      <MatrixCalcInfo matrices={$matrixSitesStore} bind:edges />
    {/if}
  </div>
  <div class="text-center p-4 bg-surface-100-800-token" slot="footer">
    {#if $isMaxMatrixDestinationStore}
      <div class="text-warning-500">At max items of 10</div>
    {/if}

    {#if !showCalcInfo}
      <button
        disabled={calculateButtonDisabled}
        on:click={handleRouteCalculate}
        class="btn btn-md variant-filled">Calculate</button
      >
    {:else}
      <button on:click={handleCalcAnotherRoute} class="btn btn-md variant-filled"
        >Calculate Another Route</button
      >
    {/if}
  </div>
</DraggableWindow>
