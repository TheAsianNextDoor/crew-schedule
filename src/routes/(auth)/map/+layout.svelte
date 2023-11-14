<script lang="ts">
  import Map from './components/map.svelte';
  import ButtonCarousel from './components/button-carousel.svelte';
  import AutoComplete from './components/auto-complete.svelte';
  import { isMapFilterVisibleStore } from './stores/filter-store';
  import Modals from './components/modals.svelte';

  export let data;

  let sidebarWidth = 408;
</script>

<div class="absolute z-30" style="width:{sidebarWidth}px">
  {#if !$isMapFilterVisibleStore}
    <AutoComplete locations={data.locations} />
  {/if}
</div>

<div class="z-20 relative">
  <div class="absolute" style="width:{sidebarWidth}px">
    <slot />
  </div>
  <div class="absolute" style="left:{sidebarWidth}px">
    <ButtonCarousel />
  </div>
</div>

<div class="w-full h-full absolute">
  <Map locations={data.locations} />
</div>

<!-- add profile icon here -->
<!-- <div class="absolute right-0 z-20">Profile</div> -->

<Modals />
