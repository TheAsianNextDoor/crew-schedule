<script lang="ts">
  import { hideMapFilter } from '../stores/map-filter-store';
  import LeftArrow from 'svelte-material-icons/ArrowLeft.svelte';
  import { clearFilteredHydratedMarkers, filterByForeman } from '../stores/map-marker-store';
  import FilterSection from './filter-section.svelte';

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

<div class="flex justify-between p-4 border-slate-400 border-solid border-b">
  <button on:click={clearFiltersAndClose}>
    <LeftArrow size="30px" />
  </button>
  <div class="flex gap-4">
    <button on:click={clearFilters}>Clear</button>
    <button on:click={saveAndClose}>Done</button>
  </div>
</div>

<div class="py-4 px-6">
  <FilterSection label="Foreman">
    <input
      class="input variant-form-material"
      bind:value={foremanName}
      on:input={(e) => filterByForeman(e.currentTarget.value)}
    />
  </FilterSection>

  <FilterSection label="Current Phase Estimated Hours">
    <input
      class="input variant-form-material"
      bind:value={foremanName}
      on:input={(e) => filterByForeman(e.currentTarget.value)}
    />
  </FilterSection>
</div>
