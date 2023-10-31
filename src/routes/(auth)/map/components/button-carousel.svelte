<script lang="ts">
  import {
    hideMapFilter,
    isMapFilterVisible,
    isMapFilterVisibleStore,
    showMapFilter,
  } from '../stores/map-filter-store';
  import { showMapSidebar } from '../stores/map-sidebar-store';
  import {
    getMapMode,
    mapModeStore,
    setMapModeBase,
    setMapModeMatrix,
    setMapModeRoutes,
  } from '../stores/map-mode-store';
  import { changePinsToRoutes } from '../stores/map-routes-store';
  import { hideRoutesPolylines, showRoutesPolylines } from '../stores/routes-polyline-store';
  import { changePinsToMatrix } from '../stores/map-matrix-store';
  import { hideMatrixPolylines, showMatrixPolylines } from '../stores/matrix-polyline.store';

  const handleFilterClick = () => {
    if (isMapFilterVisible()) {
      hideMapFilter();
    } else {
      showMapSidebar();
      showMapFilter();
    }
  };

  const handleRoutesClick = () => {
    // if already in routes mode
    if (getMapMode() === 'routes') {
      hideRoutesPolylines();
      setMapModeBase();
    } else {
      changePinsToRoutes();
      hideMatrixPolylines();
      showRoutesPolylines();
      setMapModeRoutes();
    }
  };

  const handleMatrixClick = () => {
    // if already in matrix
    if (getMapMode() === 'matrix') {
      setMapModeBase();
      hideMatrixPolylines();
    } else {
      showMatrixPolylines();
      hideRoutesPolylines();
      changePinsToMatrix();
      setMapModeMatrix();
    }
  };
</script>

<div class="flex mt-6">
  <button
    class="flex {$isMapFilterVisibleStore &&
      'variant-outline-secondary'} justify-center shadow-lg items-center w-20 h-8 rounded-lg bg-surface-100-800-token ml-6"
    on:click={handleFilterClick}
  >
    <i class="pr-1 fa-solid fa-filter fa-sm"></i>
    Filters
  </button>
  <button
    class="btn {$mapModeStore === 'routes' &&
      'variant-outline-secondary'} flex justify-center shadow-lg items-center w-20 h-8 rounded-lg bg-surface-100-800-token ml-6"
    on:click={handleRoutesClick}
  >
    <i class="pr-1 fa-solid fa-route fa-sm"></i>
    Routes
  </button>
  <button
    class="btn {$mapModeStore === 'matrix' &&
      'variant-outline-secondary'} flex justify-center shadow-lg items-center w-20 h-8 rounded-lg bg-surface-100-800-token ml-6"
    on:click={handleMatrixClick}
  >
    <i class="pr-1 fa-solid fa-bezier-curve fa-sm"></i>
    Matrix
  </button>
</div>
