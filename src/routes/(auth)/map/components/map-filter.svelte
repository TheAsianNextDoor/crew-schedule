<script lang="ts">
  import { hideMapFilter } from '../stores/map-filter-store';
  import LeftArrow from 'svelte-material-icons/ArrowLeft.svelte';
  import { clearFilteredHydratedMarkers, filterByForeman } from '../stores/map-marker-store';

  let foremanName = '';

  const saveAndClose = () => {
    hideMapFilter();
  };

  const clearFilters = () => {
    foremanName = '';
    clearFilteredHydratedMarkers();
  };

  const clearFiltersAndClose = () => {
    clearFilters();
    hideMapFilter();
  };
</script>

<div class="flex justify-between p-6 border-slate-400 border-solid border-b">
  <button on:click={clearFiltersAndClose}>
    <LeftArrow size="32px" />
  </button>
  <div class="flex gap-4">
    <button on:click={clearFilters}>Clear</button>
    <button on:click={saveAndClose}>Done</button>
  </div>
</div>

<div class="flex flex-row items-center">
  <span>Foreman Name:</span>
  <input bind:value={foremanName} on:input={(e) => filterByForeman(e.currentTarget.value)} />
</div>

<div class="flex flex-row items-center">
  <span>Foreman Name:</span>
  <input bind:value={foremanName} on:input={(e) => filterByForeman(e.currentTarget.value)} />
</div>
