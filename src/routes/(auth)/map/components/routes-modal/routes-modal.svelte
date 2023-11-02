<script lang="ts">
  import DraggableWindow from '$lib/components/draggable-window.svelte';
  import DraggableList from './routes-list.svelte';
  import {
    getRouteSites,
    isMaxRouteItemsStore,
    routeSitesStore,
  } from '../../stores/route-sites-store';
  import type { routesData } from '../../../../../../mock/routes';
  import { buildRouteCalcPolyline, type Leg } from '../../helpers/polyline-utils';
  import { addRoutePolyline, clearRoutePolylines } from '../../stores/route-polyline-store';
  import RouteCalcInfo from './route-calc-info.svelte';

  $: calculateButtonDisabled = $routeSitesStore.length < 2;

  let legs: Leg[];
  let showCalcInfo = false;
  let totalDistance = 0;
  let totalDuration = 0;

  const handleRouteCalculate = async (isOptimal: boolean) => {
    const mapRoutes = getRouteSites();
    const routes = mapRoutes.map(({ site }) => site.location);
    const result = await (
      await fetch('/api/v1/auth/routes', {
        method: 'POST',
        body: JSON.stringify({ routes, isOptimal }),
      })
    ).json();

    const [data] = result.data.routes as typeof routesData;

    data.legs.forEach((leg, index) => {
      totalDistance += Number(leg.localizedValues.distance.text.split(' ')[0]);
      totalDuration += Number(leg.localizedValues.staticDuration.text.split(' ')[0]);

      const polyline = buildRouteCalcPolyline(leg, index);
      addRoutePolyline({
        origin: mapRoutes[index],
        destination: mapRoutes[index + 1],
        polyline,
      });
    });

    legs = data.legs;
    showCalcInfo = true;
  };

  const handleCalcAnotherRoute = () => {
    legs = [];
    clearRoutePolylines();
    showCalcInfo = false;
  };
</script>

<DraggableWindow
  left={document.body.clientWidth - 288 - 10}
  top={document.body.clientHeight - document.body.clientHeight / 2 - 384 / 2 - 50}
>
  <div class="bg-surface-600 text-slate-200 h4 text-center rounded-t-lg" slot="header">
    Route Calculation
  </div>
  <div
    class="bg-surface-100-800-token p-4 overflow-auto box-border flex flex-1 flex-col"
    slot="content"
  >
    {#if !showCalcInfo}
      <DraggableList />
    {:else}
      <RouteCalcInfo bind:legs bind:totalDistance bind:totalDuration />
    {/if}
  </div>
  <div class="text-center p-4 bg-surface-100-800-token" slot="footer">
    {#if $isMaxRouteItemsStore}
      <div class="text-warning-500">At max items of 10</div>
    {/if}

    {#if !showCalcInfo}
      <button
        disabled={calculateButtonDisabled}
        on:click={() => handleRouteCalculate(false)}
        class="btn btn-md variant-filled">As Stated</button
      >
      <button
        disabled={calculateButtonDisabled}
        on:click={() => handleRouteCalculate(true)}
        class="btn btn-md variant-filled">Optimal</button
      >
    {:else}
      <button on:click={handleCalcAnotherRoute} class="btn btn-md variant-filled"
        >Calculate Another Route</button
      >
    {/if}
  </div>
</DraggableWindow>
