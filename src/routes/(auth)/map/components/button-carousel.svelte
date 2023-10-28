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
    setMapModeRoutes,
  } from '../stores/map-mode-store';
  import { clearMapRoutes } from '../stores/map-routes-store';
  import { clearMapPolylines } from '../stores/map-polyline-store';

  const setRoutesMode = () => {
    if (getMapMode() === 'routes') {
      clearMapRoutes();
      clearMapPolylines();
      setMapModeBase();
    } else if (getMapMode() === 'base') {
      setMapModeRoutes();
    }
  };

  const handleFilterClick = () => {
    if (isMapFilterVisible()) {
      hideMapFilter();
    } else {
      showMapSidebar();
      showMapFilter();
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
    on:click={setRoutesMode}
  >
    <i class="pr-1 fa-solid fa-route fa-sm"></i>
    Routes
  </button>
</div>
