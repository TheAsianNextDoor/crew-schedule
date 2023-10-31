<script lang="ts">
  import DraggableWindow from '$lib/components/draggable-window.svelte';
  import { clearRoutesPolylines } from '../../stores/routes-polyline-store';
  import MatrixList from './matrix-list.svelte';
  import {
    clearMatrixOrigin,
    getMatrixOrigin,
    mapMatrixStore,
    setIsNotSelectingMatrixOrigin,
    setIsSelectingMatrixOrigin,
  } from '../../stores/map-matrix-store';
  import { listItemContainer } from '$lib/styles';
  import { MARKER_PINS, changeMarkerPin } from '../../helpers/marker-pin-utils';
  import type { Marker } from '../../helpers/marker-utils';
  import MatrixCalcInfo from './matrix-calc-info.svelte';
  import type { MatrixItem } from '../../../../api/v1/auth/matrix/get-google-matrix';
  import type { fetchResult } from '$lib/utils/fetch';

  $: calculateButtonDisabled = $mapMatrixStore.origin && $mapMatrixStore.destinations.length < 2;

  let edges: MatrixItem[] = [];
  let showMatrixCalcInfo = false;

  const handleOriginRemove = () => {
    setIsNotSelectingMatrixOrigin();
    changeMarkerPin(getMatrixOrigin()?.marker as Marker, MARKER_PINS.default);
    clearMatrixOrigin();
  };

  const handleRouteCalculate = async () => {
    const { origin, destinations } = $mapMatrixStore;
    const originLocations = [origin?.site.location];
    const destinationLocations = destinations.map(({ site }) => site.location);
    const result = await (
      await fetch('/api/v1/auth/matrix', {
        method: 'POST',
        body: JSON.stringify({ originLocations, destinationLocations }),
      })
    ).json();

    const { data } = result as fetchResult<MatrixItem[]>;

    console.log('data: ', data);

    // data.legs.forEach((leg, index) => {
    //   totalDistance += Number(leg.localizedValues.distance.text.split(' ')[0]);
    //   totalDuration += Number(leg.localizedValues.duration.text.split(' ')[0]);

    //   const polyline = buildRouteCalcPolyline(leg, index);
    //   addRoutesPolyline({
    //     origin: mapRoutes[index],
    //     destination: mapRoutes[index + 1],
    //     polyline,
    //   });
    // });

    edges = data;
    showMatrixCalcInfo = true;
  };

  const handleCalcAnotherRoute = () => {
    edges = [];
    clearRoutesPolylines();
    showMatrixCalcInfo = false;
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
    {#if !showMatrixCalcInfo}
      <h2 class="h4">Origin:</h2>
      {#if $mapMatrixStore.origin}
        <div class={`${listItemContainer}`}>
          {$mapMatrixStore.origin.site.site_name}
          <button on:click={handleOriginRemove}>
            <i class="fa-regular fa-circle-xmark"></i>
          </button>
        </div>
      {:else}
        <button on:click={setIsSelectingMatrixOrigin}>Set Origin</button>
      {/if}
      <h2 class="h4">Destination:</h2>
      <MatrixList />
    {:else}
      <MatrixCalcInfo matrices={$mapMatrixStore} bind:edges />
    {/if}
  </div>
  <div class="text-center p-4 bg-surface-100-800-token" slot="footer">
    {#if !showMatrixCalcInfo}
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
