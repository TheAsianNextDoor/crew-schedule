<script lang="ts">
  import DraggableWindow from '$lib/components/draggable-window.svelte';
  import DraggableList from './routes-list.svelte';
  import {
    addToTotalLegDistance,
    addToTotalLegDuration,
    clearRouteLegs,
    clearRouteSites,
    getRouteSites,
    hideRouteCalcInfo,
    isMaxRouteItemsStore,
    isRouteCalcInfoVisible,
    routeLegs,
    routeSitesStore,
    setRouteLegs,
    showRouteCalcInfo,
    totalLegDistance,
    totalLegDuration,
  } from '../../stores/route-sites-store';
  import type { routesData } from '../../../../../../mock/routes';
  import { buildRouteCalcPolyline } from '../../helpers/polyline-utils';
  import { addRoutePolyline, clearRoutePolylines } from '../../stores/route-polyline-store';
  import RouteCalcInfo from './route-calc-info.svelte';
  import { setAllPinsToDefault } from '../../helpers/marker-pin-utils';

  $: calculateButtonDisabled = $routeSitesStore.length < 2;

  const handleRouteCalculate = async (isOptimal: boolean) => {
    const mapRoutes = getRouteSites();
    const routes = mapRoutes.map(({ site }) => site.location);
    const result = await (
      await fetch('/api/v1/auth/routes', {
        method: 'POST',
        body: JSON.stringify({ routes, isOptimal }),
      })
    ).json();

    const [{ legs }] = result.data.routes as typeof routesData;

    legs.forEach((leg, index) => {
      addToTotalLegDistance(Number(leg.localizedValues.distance.text.split(' ')[0]));
      addToTotalLegDuration(Number(leg.localizedValues.staticDuration.text.split(' ')[0]));

      const polyline = buildRouteCalcPolyline(leg, index);
      addRoutePolyline({
        origin: mapRoutes[index],
        destination: mapRoutes[index + 1],
        polyline,
      });
    });

    setRouteLegs(legs);
    showRouteCalcInfo();
  };

  const handleCalcAnotherRoute = () => {
    clearRouteLegs();
    clearRoutePolylines();
    hideRouteCalcInfo();
  };

  const handleClear = () => {
    clearRouteSites();
    setAllPinsToDefault();
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
    {#if $isRouteCalcInfoVisible}
      <RouteCalcInfo
        legs={$routeLegs}
        totalDistance={$totalLegDistance}
        totalDuration={$totalLegDuration}
      />
    {:else}
      <DraggableList />
    {/if}
  </div>
  <div class="text-center p-4 bg-surface-100-800-token" slot="footer">
    {#if $isMaxRouteItemsStore}
      <div class="text-warning-500">At max items of 10</div>
    {/if}

    {#if $isRouteCalcInfoVisible}
      <button on:click={handleCalcAnotherRoute} class="btn btn-md variant-filled"
        >Calculate Another Route</button
      >
    {:else}
      <button
        disabled={$routeSitesStore.length < 1}
        on:click={handleClear}
        class="btn btn-sm variant-filled">Clear</button
      >
      <button
        disabled={calculateButtonDisabled}
        on:click={() => handleRouteCalculate(false)}
        class="btn btn-sm variant-filled">As Stated</button
      >
      <button
        disabled={calculateButtonDisabled}
        on:click={() => handleRouteCalculate(true)}
        class="btn btn-sm variant-filled">Optimal</button
      >
    {/if}
  </div>
</DraggableWindow>
