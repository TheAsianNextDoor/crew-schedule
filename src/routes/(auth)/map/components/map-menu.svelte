<script lang="ts">
  import { onDestroy } from 'svelte';
  import MenuLeft from 'svelte-material-icons/MenuLeft.svelte';
  import MenuRight from 'svelte-material-icons/MenuRight.svelte';
  import { sineIn } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import type { MapSite } from '../queries/retrieve-map-sites';
  import { hideMapMenu, isMapMenuVisible, showMapMenu } from './map-menu-store';
  import MapSearchInfo from './map-search-info.svelte';
  import MapFilter from './map-filter.svelte';

  export let sites: MapSite[];

  let isVisible: boolean;

  const unsub = isMapMenuVisible.subscribe((value) => {
    isVisible = value;
  });
  onDestroy(unsub);

  const getFlyTransition = (x: number) => ({ duration: 300, easing: sineIn, x, opacity: 100 });
</script>

<div>
  <!-- Menu -->
  {#if isVisible}
    <div transition:fly={getFlyTransition(-408)}>
      <MapSearchInfo bind:sites />
      <MapFilter />
      <button class="right-of-menu absolute filter ml-10 mt-5"> Filters </button>
      <button class="arrow right-of-menu" on:click={hideMapMenu}>
        <MenuLeft size="23px" />
      </button>
    </div>
  {/if}
  <!-- Menu -->

  {#if !isVisible}
    <button transition:fly={getFlyTransition(408)} class="arrow" on:click={showMapMenu}>
      <MenuRight size="23px" />
    </button>
  {/if}
</div>

<style>
  .arrow {
    border-radius: 0 8px 8px 0;
    border-left: 1px solid gray;
    height: 3rem;
    width: 1.5rem;
    position: absolute;
    background-color: white;
    display: block;
    top: calc(50vh - 3rem);
  }

  .right-of-menu {
    left: 408px;
  }
</style>
