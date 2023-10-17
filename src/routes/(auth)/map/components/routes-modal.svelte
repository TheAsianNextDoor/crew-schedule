<script>
  import DraggableWindow from '$lib/components/draggable-window.svelte';
  import DraggableList from './draggable-list.svelte';
  import { mapRoutesStore } from '../stores/map-routes-store';

  $: calculateButtonDisabled = $mapRoutesStore.length < 2;

  const handleRouteCalculate = async () => {
    const result = await (await fetch('/api/v1/auth/distance')).json();

    console.log('res: ', result);
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
