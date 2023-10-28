<script lang="ts">
  import SideBarContainer from './components/sidebar/sidebar-container.svelte';
  import Map from './components/map.svelte';
  import { mapModeStore } from './stores/map-mode-store';
  import RoutesModal from './components/routes-modal/routes-modal.svelte';
  import ButtonCarousel from './components/button-carousel.svelte';
  import AutoComplete from './components/sidebar/auto-complete.svelte';
  import { isMapFilterVisibleStore } from './stores/map-filter-store';

  export let data;

  let sidebarWidth = 408;
</script>

<div class="absolute z-30" style="width:{sidebarWidth}px">
  {#if !$isMapFilterVisibleStore}
    <AutoComplete sites={data.sites} />
  {/if}
</div>

<div class="z-20 relative">
  <div class="absolute" style="width:{sidebarWidth}px">
    <SideBarContainer disciplines={data.disciplines} bind:sidebarWidth />
  </div>
  <div class="absolute" style="left:{sidebarWidth}px">
    <ButtonCarousel />
  </div>
</div>

<div class="w-full h-full z-10 absolute">
  <Map sites={data.sites} />
</div>

{#if $mapModeStore === 'routes'}
  <RoutesModal />
{/if}
