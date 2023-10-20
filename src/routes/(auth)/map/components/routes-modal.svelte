<script lang="ts">
  import DraggableWindow from '$lib/components/draggable-window.svelte';
  import DraggableList from './draggable-list.svelte';
  import { getMapRoutes, mapRoutesStore } from '../stores/map-routes-store';
  import type { routesData } from '$lib/routes-filter';
  import { getGoogleMaps } from '$lib/constants/google-maps';
  import { getMap } from '../stores/map-store';
  import { getRouteColor } from '$lib/utils/colors';
  import { getInfoWindow } from '../stores/infow-window-store';

  $: calculateButtonDisabled = $mapRoutesStore.length < 2;

  const { encoding, Polyline } = getGoogleMaps();

  const handleRouteCalculate = async () => {
    const routes = getMapRoutes().map(({ site }) => site.location);
    const result = await (
      await fetch('/api/v1/auth/routes', { method: 'POST', body: JSON.stringify({ routes }) })
    ).json();

    const [data] = result.data.routes as typeof routesData;

    data.legs.forEach((leg, index) => {
      const path = encoding.decodePath(leg.polyline.encodedPolyline);
      const strokeColor = getRouteColor(index + 4);

      const poly = new Polyline({
        map: getMap(),
        path,
        geodesic: true,
        strokeColor,
        strokeOpacity: 1.0,
        strokeWeight: 4,
        clickable: true,
      });

      poly.addListener('click', (e: MouseEvent) => {
        // @ts-expect-error
        getInfoWindow().setPosition(e.latLng);
        getInfoWindow().setContent(
          `<div>Distance: ${leg.localizedValues.distance.text}</div><div>Duration: ${leg.localizedValues.duration.text}</div>`,
        );
        getInfoWindow().open(getMap());
      });
    });
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
    <DraggableList />
  </div>
  <div class="text-right p-4 bg-surface-100-800-token" slot="footer">
    <button
      disabled={calculateButtonDisabled}
      on:click={handleRouteCalculate}
      class="btn btn-md variant-filled">Calculate</button
    >
  </div>
</DraggableWindow>
