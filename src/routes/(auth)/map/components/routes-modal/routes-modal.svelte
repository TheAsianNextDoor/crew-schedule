<script lang="ts">
  import DraggableWindow from '$lib/components/draggable-window.svelte';
  import DraggableList from './draggable-list.svelte';
  import { getMapRoutes, mapRoutesStore } from '../../stores/map-routes-store';
  import type { routesData } from '$lib/routes-filter';
  import { buildRouteCalcPolyline, type Leg } from '../../helpers/polyline-utils';
  import { addMapPolyline, clearMapPolylines } from '../../stores/map-polyline-store';

  $: calculateButtonDisabled = $mapRoutesStore.length < 2;

  let legs: Leg[];
  let showRouteCalcInfo = false;
  let totalDistance = 0;
  let totalDuration = 0;

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
      addMapPolyline({
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
    clearMapPolylines();
    showRouteCalcInfo = false;
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
    {#if !showRouteCalcInfo}
      <DraggableList />
    {:else}
      {#each legs as leg, index}
        <div class="p-2">
          <h1>
            {$mapRoutesStore[index]?.site?.site_name} to {$mapRoutesStore[index + 1]?.site
              ?.site_name}
          </h1>
          <div>Distance: {leg.localizedValues.distance.text}</div>
          <div>Duration: {leg.localizedValues.duration.text}</div>
        </div>
      {/each}
      <div>
        <h1>Total</h1>
        <div>Total Distance: {totalDistance} mi</div>
        <div>Total Distance: {totalDuration} mins</div>
      </div>
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
