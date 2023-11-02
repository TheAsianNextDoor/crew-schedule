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
    setMapModeOptimal,
    setMapModeRoutes,
  } from '../stores/map-mode-store';
  import { changePinsToRoutes } from '../stores/map-routes-store';
  import { hideRoutesPolylines, showRoutesPolylines } from '../stores/routes-polyline-store';
  import { changePinsToMatrix } from '../stores/map-matrix-store';
  import { hideMatrixPolylines, showMatrixPolylines } from '../stores/matrix-polyline.store';
  import { changePinsToOptimal } from '../stores/optimal-sites-store';
  import { hideOptimalPolyline, showOptimalPolyline } from '../stores/optimal-polyline-store';

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
    // if already in matrix mode
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

  const handleOptimalClick = () => {
    // if already in optimal mode
    if (getMapMode() === 'optimal') {
      setMapModeBase();
      hideOptimalPolyline();
    } else {
      showOptimalPolyline();
      hideRoutesPolylines();
      hideMatrixPolylines();
      changePinsToOptimal();
      setMapModeOptimal();
    }
  };
</script>

<div class="flex mt-6">
  <button
    class="flex {$isMapFilterVisibleStore &&
      'variant-outline-secondary'} justify-center shadow-lg items-center px-2 h-8 rounded-lg bg-surface-100-800-token ml-6"
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

  <!-- not used anymore, save for when needing another modal
   <button
    class="btn {$mapModeStore === 'optimal' &&
      'variant-outline-secondary'} flex justify-center shadow-lg items-center px-2 h-8 rounded-lg bg-surface-100-800-token ml-6"
    on:click={handleOptimalClick}
  >
    <i class="fa-solid fa-wand-magic-sparkles"></i>
    Optimal
  </button> -->
</div>
