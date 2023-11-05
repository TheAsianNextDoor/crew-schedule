<script lang="ts">
  import { mapModeStore } from '../stores/map-mode-store';
  import MatrixModal from './matrix-modal/matrix-modal.svelte';
  import RoutesModal from './routes-modal/routes-modal.svelte';
</script>

{#if $mapModeStore === 'routes'}
  <RoutesModal />
{/if}

{#if $mapModeStore === 'matrix'}
  <MatrixModal />
{/if}
