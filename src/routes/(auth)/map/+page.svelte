<script lang="ts">
  import MapMenu from './components/sidebar/map-sidebar.svelte';
  import Map from './components/map.svelte';
  import { mapModeStore } from './stores/map-mode-store';
  import MapRoutesModal from './components/routes-modal.svelte';

  export let data;
</script>

<div class="z-20 relative">
  <MapMenu disciplines={data.disciplines} sites={data.sites} />
</div>
<div class="w-full h-full z-10 absolute">
  <Map sites={data.sites} />
</div>

{#if $mapModeStore === 'routes'}
  <MapRoutesModal />
{/if}
