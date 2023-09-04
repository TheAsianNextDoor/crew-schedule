<script lang="ts">
  import { hideMapFilter } from '../stores/map-filter-store';
  import LeftArrow from 'svelte-material-icons/ArrowLeft.svelte';
  import {
    clearFilteredHydratedMarkers,
    clearFilterConditionFuncs,
  } from '../stores/map-marker-store';
  import FilterSection from './filter-section.svelte';
  import {
    filterByEstimatedHours,
    filterByForeman,
    filterByStatusName,
  } from '../helpers/filter-funcs';
  import { STATUS_ENUM } from '$lib/constants/status';

  let foremanName = '';
  let estimatedHours: number;
  let status: '';

  const saveAndClose = () => {
    hideMapFilter();
  };

  const clearFilters = () => {
    foremanName = '';
    clearFilteredHydratedMarkers();
    clearFilterConditionFuncs();
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
      on:input={filterByForeman}
    />
  </FilterSection>

  <FilterSection label="Estimated Hours">
    <input
      class="input variant-form-material"
      type="number"
      bind:value={estimatedHours}
      on:input={filterByEstimatedHours}
    />
  </FilterSection>

  <FilterSection label="Status">
    <select bind:value={status} on:change={filterByStatusName} class="select">
      <option selected value=""> -- select an option -- </option>
      <option value={STATUS_ENUM.PENDING}>{STATUS_ENUM.PENDING}</option>
      <option value={STATUS_ENUM.SCHEDULED}>{STATUS_ENUM.SCHEDULED}</option>
      <option value={STATUS_ENUM.IN_PROGRESS}>{STATUS_ENUM.IN_PROGRESS}</option>
      <option value={STATUS_ENUM.COMPLETED}>{STATUS_ENUM.COMPLETED}</option>
    </select>
  </FilterSection>
</div>
