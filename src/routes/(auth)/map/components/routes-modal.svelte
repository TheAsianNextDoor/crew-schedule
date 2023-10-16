<script>
  import DraggableWindow from '$lib/components/draggable-window.svelte';
  import { onDestroy } from 'svelte';
  import { mapRoutesSubscribe } from '../stores/map-routes-store';
  import DraggableList from './draggable-list.svelte';

  let calculateButtonDisabled = true;

  const unsubMapRoutes = mapRoutesSubscribe((val) => {
    calculateButtonDisabled = val.length < 2;
  });
  onDestroy(unsubMapRoutes);

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
    class="bg-surface-100-800-token pl-4 pt-4 pb-4 overflow-auto box-border flex flex-1 flex-col"
    slot="content"
  >
    <DraggableList />
    <div class="text-right pr-4">
      <button
        disabled={calculateButtonDisabled}
        on:click={handleRouteCalculate}
        class="btn btn-md variant-filled">Calculate</button
      >
    </div>
  </div>
</DraggableWindow>
