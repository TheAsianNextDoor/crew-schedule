<script>
  import DraggableWindow from '$lib/components/draggable-window.svelte';
</script>

<DraggableWindow
  left={document.body.clientWidth - 288 - 10}
  top={document.body.clientHeight - document.body.clientHeight / 2 - 384 / 2 - 50}
>
  <div class="bg-slate-400 h4 text-center" slot="header">Route Calculation</div>
  <div class="m-4" slot="content">Route Content</div>
</DraggableWindow>
