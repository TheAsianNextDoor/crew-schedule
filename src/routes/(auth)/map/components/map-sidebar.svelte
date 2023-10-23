<script lang="ts">
  import { sineIn } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import { isMapFilterVisibleStore, toggleMapFilter } from '../stores/map-filter-store';
  import MapSearchInfo from './map-search-info.svelte';
  import MapFilter from './map-filter.svelte';
  import {
    hideMapSidebar,
    showMapSidebar,
    selectedEntityStore,
    isMapSidebarVisibleStore,
    getSelectedEntity,
    isMapSidebarVisible,
  } from '../stores/map-sidebar-store';
  import type { HydratedMapSite } from '../proxy+page.server';
  import {
    getMapMode,
    mapModeStore,
    setMapModeBase,
    setMapModeRoutes,
  } from '../stores/map-mode-store';
  import { clearMapRoutes } from '../stores/map-routes-store';
  import AutoComplete from './auto-complete.svelte';

  export let sites: HydratedMapSite[];

  const setRoutesMode = () => {
    if (getMapMode() === 'routes') {
      clearMapRoutes();
      setMapModeBase();
    } else if (getMapMode() === 'base') {
      setMapModeRoutes();
    }
  };

  const handleFilterClick = () => {
    toggleMapFilter();

    if (!isMapSidebarVisible()) {
      showMapSidebar();
    } else if (isMapSidebarVisible() && !getSelectedEntity()) {
      hideMapSidebar();
    }
  };

  const getFlyTransition = (x: number) => ({ duration: 300, easing: sineIn, x, opacity: 100 });
</script>

{#if !$isMapFilterVisibleStore}
  <div class="sidebar-width absolute z-30">
    <AutoComplete bind:sites />
  </div>
{/if}

{#if $isMapSidebarVisibleStore}
  <div class="sidebar-width absolute" transition:fly={getFlyTransition(-408)}>
    <div class="overflow-y-auto bg-surface-200-700-token h-screen">
      {#if $isMapFilterVisibleStore}
        <MapFilter />
      {:else if $selectedEntityStore}
        <MapSearchInfo />
      {/if}
    </div>
  </div>
{/if}

<!-- Floating buttons -->
<div class="right-of-menu absolute flex mt-6">
  <button
    class="flex {$isMapFilterVisibleStore &&
      'variant-outline-secondary'} justify-center shadow-md items-center w-20 h-8 rounded-lg bg-surface-100-800-token ml-6"
    on:click={handleFilterClick}
  >
    <i class="pr-1 fa-solid fa-filter fa-sm"></i>
    Filters
  </button>
  <button
    class="btn {$mapModeStore === 'routes' &&
      'variant-outline-secondary'} flex justify-center shadow-md items-center w-20 h-8 rounded-lg bg-surface-100-800-token ml-6"
    on:click={setRoutesMode}
  >
    <i class="pr-1 fa-solid fa-route fa-sm"></i>
    Routes
  </button>
</div>

<!-- Close/Open Menu icon -->
{#if $isMapSidebarVisibleStore}
  <button class="arrow right-of-menu bg-surface-100-800-token" on:click={hideMapSidebar}>
    <i class="fa-solid fa-caret-left"></i>
  </button>
{:else}
  <button
    transition:fly={getFlyTransition(408)}
    class="arrow bg-surface-100-800-token"
    on:click={showMapSidebar}
  >
    <i class="fa-solid fa-caret-right"></i>
  </button>
{/if}

<style>
  .sidebar-width {
    width: 408px;

    /* @media (max-width: 767px) {
      width: 100%;
    } */
  }

  .arrow {
    border-radius: 0 8px 8px 0;
    border-left: 1px solid gray;
    height: 3rem;
    width: 1.5rem;
    position: absolute;
    display: block;
    top: calc(50vh - 3rem);
  }

  .right-of-menu {
    left: 408px;
  }
</style>
