<script lang="ts">
  import { hideMapFilter } from './(sidebar)/filter/filter-store';
  import { hideMapSidebar } from './(sidebar)/sidebar-store';
  import { setSelectedEntity } from './stores/selected-entity-store';

  hideMapFilter();
  hideMapSidebar();
  setSelectedEntity(null);
</script>

<slot />
