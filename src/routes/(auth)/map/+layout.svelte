<script lang="ts">
  import Map from './components/map.svelte';
  import ButtonCarousel from './components/button-carousel.svelte';
  import AutoComplete from './components/auto-complete.svelte';
  import { getFilterQueryParams, isMapFilterVisibleStore } from './(sidebar)/filter/filter-store';
  import Modals from './components/modals.svelte';
  import { beforeNavigate } from '$app/navigation';

  export let data;

  let sidebarWidth = 408;

  beforeNavigate(({ to, from }) => {
    if (!(to?.url.pathname.includes('/filter') && from?.url.pathname.includes('/filter'))) {
      const queryParams = getFilterQueryParams();
      for (const param in queryParams) {
        to?.url.searchParams.set(param, queryParams[param] as string);
        history.replaceState(null, '', to?.url.href);
      }
    }
  });
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
