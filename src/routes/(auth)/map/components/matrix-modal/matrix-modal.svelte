<script lang="ts">
  import DraggableWindow from '$lib/components/draggable-window.svelte';
  import { getMapRoutes, mapRoutesStore } from '../../stores/map-routes-store';
  import type { routesData } from '$lib/routes-filter';
  import { buildRouteCalcPolyline, type Leg } from '../../helpers/polyline-utils';
  import { addRoutesPolyline, clearRoutesPolylines } from '../../stores/routes-polyline-store';
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

  $: calculateButtonDisabled = $mapRoutesStore.length < 2;

  let legs: Leg[];
  let showRouteCalcInfo = false;
  let totalDistance = 0;
  let totalDuration = 0;

  const handleOriginRemove = () => {
    setIsNotSelectingMatrixOrigin();
    changeMarkerPin(getMatrixOrigin()?.marker as Marker, MARKER_PINS.default);
    clearMatrixOrigin();
  };

  const handleRouteCalculate = async () => {
    const mapRoutes = getMapRoutes();
    const routes = mapRoutes.map(({ site }) => site.location);
    const result = await (
      await fetch('/api/v1/auth/routes', { method: 'POST', body: JSON.stringify({ routes }) })
    ).json();

    const [data] = result.data.routes as typeof routesData;

    data.legs.forEach((leg, index) => {
      totalDistance += Number(leg.localizedValues.distance.text.split(' ')[0]);
      totalDuration += Number(leg.localizedValues.duration.text.split(' ')[0]);

      const polyline = buildRouteCalcPolyline(leg, index);
      addRoutesPolyline({
        origin: mapRoutes[index],
        destination: mapRoutes[index + 1],
        polyline,
      });
    });

    legs = data.legs;
    showRouteCalcInfo = true;
  };

  const handleCalcAnotherRoute = () => {
    legs = [];
    clearRoutesPolylines();
    showRouteCalcInfo = false;
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
    {#if !showRouteCalcInfo}
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
      <MatrixCalcInfo />
    {/if}
  </div>
  <div class="text-center p-4 bg-surface-100-800-token" slot="footer">
    {#if !showRouteCalcInfo}
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
