<script>
  import DraggableWindow from '$lib/components/draggable-window.svelte';
  import DraggableList from './draggable-list.svelte';
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
  </div>
</DraggableWindow>
