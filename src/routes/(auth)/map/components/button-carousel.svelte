<script lang="ts">
  import {
    getMapMode,
    mapModeStore,
    setMapModeBase,
    setMapModeMatrix,
    setMapModeRoutes,
  } from '../stores/map-mode-store';
  import { hideRoutePolylines } from '../stores/route-polyline-store';
  import { hideMatrixPolylines } from '../stores/matrix-polyline.store';
  import {
    filterQueryParamsStore,
    isMapFilterVisibleStore,
    showMapFilter,
  } from '../filter/filter-store';
  import { showMapSidebar } from '../stores/sidebar-store';

  const handleFilterClick = () => {
    showMapFilter();
    showMapSidebar();
  };

  const handleRoutesClick = () => {
    // if already in routes mode
    if (getMapMode() === 'routes') {
      hideRoutePolylines();
      setMapModeBase();
    } else {
      setMapModeRoutes();
      hideMatrixPolylines();
    }
  };

  const handleMatrixClick = () => {
    // if already in matrix mode
    if (getMapMode() === 'matrix') {
      setMapModeBase();
      hideMatrixPolylines();
    } else {
      setMapModeMatrix();
      hideRoutePolylines();
    }
  };
</script>

{#if !$isMapFilterVisibleStore}
  <div class="flex mt-6">
    <button
      class={`btn ${
        Object.keys($filterQueryParamsStore).length && 'variant-outline-secondary'
      } flex  justify-center shadow-lg items-center px-2 h-8 rounded-lg bg-surface-100-800-token ml-6`}
      on:click={handleFilterClick}
    >
      <i class="pr-1 fa-solid fa-filter fa-sm"></i>
      Filters
    </button>
    <button
      class="btn {$mapModeStore === 'routes' &&
        'variant-outline-secondary'} flex justify-center shadow-lg items-center px-2 h-8 rounded-lg bg-surface-100-800-token ml-6"
      on:click={handleRoutesClick}
    >
      <i class="pr-1 fa-solid fa-route fa-sm"></i>
      Routes
    </button>

    <button
      class="btn {$mapModeStore === 'matrix' &&
        'variant-outline-secondary'} flex justify-center shadow-lg items-center px-2 h-8 rounded-lg bg-surface-100-800-token ml-6"
      on:click={handleMatrixClick}
    >
      <i class="pr-1 fa-solid fa-bezier-curve fa-sm"></i>
      Matrix
    </button>
  </div>
{/if}
