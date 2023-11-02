<script lang="ts">
  import DraggableWindow from '$lib/components/draggable-window.svelte';
  import { buildRouteCalcPolyline, type Leg } from '../../helpers/polyline-utils';
  import OptimalCalcInfo from './optimal-calc-info.svelte';
  import OptimalList from './optimal-list.svelte';
  import {
    getOptimalSites,
    isMaxOptimalSitesStore,
    optimalSitesStore,
  } from '../../stores/optimal-sites-store';
  import { addOptimalPolyline } from '../../stores/optimal-polyline-store';
  import type { routesData } from '../../../../../../mock/routes';

  $: calculateButtonDisabled = $optimalSitesStore.length < 2;

  let legs: Leg[];
  let showCalcInfo = false;
  let totalDistance = 0;
  let totalDuration = 0;

  const handleOptimalPathCalculate = async () => {
    const mapRoutes = getOptimalSites();
    const sites = mapRoutes.map(({ site }) => site.location);
    const result = await (
      await fetch('/api/v1/auth/optimal', { method: 'POST', body: JSON.stringify({ sites }) })
    ).json();

    const [data] = result.data.routes as typeof routesData;

    data.legs.forEach((leg, index) => {
      totalDistance += Number(leg.localizedValues.distance.text.split(' ')[0]);
      totalDuration += Number(leg.localizedValues.staticDuration.text.split(' ')[0]);

      const polyline = buildRouteCalcPolyline(leg, index);
      addOptimalPolyline({
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
    // clearRoutesPolylines();
    showCalcInfo = false;
  };
</script>

<DraggableWindow
  left={document.body.clientWidth - 288 - 10}
  top={document.body.clientHeight - document.body.clientHeight / 2 - 384 / 2 - 50}
>
  <div class="bg-surface-600 text-slate-200 h4 text-center rounded-t-lg" slot="header">
    Optimal Path Calculation
  </div>
  <div
    class="bg-surface-100-800-token p-4 overflow-auto box-border flex flex-1 flex-col"
    slot="content"
  >
    {#if !showCalcInfo}
      <OptimalList />
    {:else}
      <OptimalCalcInfo bind:legs bind:totalDistance bind:totalDuration />
    {/if}
  </div>
  <div class="text-center p-4 bg-surface-100-800-token" slot="footer">
    {#if $isMaxOptimalSitesStore}
      <div class="text-warning-500">At max items of 10</div>
    {/if}

    {#if !showCalcInfo}
      <button
        disabled={calculateButtonDisabled}
        on:click={handleOptimalPathCalculate}
        class="btn btn-md variant-filled">Calculate</button
      >
    {:else}
      <button on:click={handleCalcAnotherRoute} class="btn btn-md variant-filled"
        >Calculate Another Optimal Path</button
      >
    {/if}
  </div>
</DraggableWindow>
