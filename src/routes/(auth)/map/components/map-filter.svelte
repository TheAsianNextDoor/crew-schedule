<script lang="ts">
  import {
    disciplineName,
    estimatedHours,
    estimatedHoursCondition,
    foremanName,
    hideMapFilter,
    phaseStatus,
  } from '../stores/map-filter-store';
  import LeftArrow from 'svelte-material-icons/ArrowLeft.svelte';
  import {
    clearFilteredHydratedMarkers,
    clearFilterConditionFuncs,
  } from '../stores/map-marker-store';
  import FilterSection from './filter-section.svelte';
  import {
    filterByDiscipline,
    filterByEstimatedHours,
    filterByForeman,
    filterByStatusName,
  } from '../helpers/filter-funcs';
  import { STATUS_ENUM } from '$lib/constants/status';
  import { EQUALITY_ENUM } from '../helpers/equality-utils';

  const saveAndClose = () => {
    hideMapFilter();
  };

  const clearFilters = () => {
    foremanName.set('');
    estimatedHoursCondition.set(EQUALITY_ENUM.eq);
    estimatedHours.set(undefined);
    phaseStatus.set('');

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
  <!-- <FilterSection label="Discipline">
    <input
      class="input variant-form-material grow basis-0"
      bind:value={$disciplineName}
      on:input={() => filterByDiscipline($disciplineName)}
    />
  </FilterSection> -->

  <FilterSection label="Discipline">
    <select bind:value={$disciplineName} on:change={filterByDiscipline} class="select">
      <option selected value={}>{}</option>
    </select>
  </FilterSection>

  <FilterSection label="Status">
    <select bind:value={$phaseStatus} on:change={filterByStatusName} class="select">
      <option selected value="">any status</option>
      <option selected value={STATUS_ENUM.SOLD}>sold</option>
      <option value={STATUS_ENUM.PENDING}>pending</option>
      <option value={STATUS_ENUM.SCHEDULED}>scheduled</option>
      <option value={STATUS_ENUM.IN_PROGRESS}>in progress</option>
      <option value={STATUS_ENUM.COMPLETED}>completed</option>
    </select>
  </FilterSection>

  <FilterSection label="Estimated Hours">
    <div class="flex gap-4">
      <select
        class="select w-min"
        bind:value={$estimatedHoursCondition}
        on:change={() => filterByEstimatedHours($estimatedHoursCondition, $estimatedHours)}
      >
        <option value={EQUALITY_ENUM.lt}>less than</option>
        <option selected value={EQUALITY_ENUM.eq}>equal</option>
        <option value={EQUALITY_ENUM.gt}>greater than</option>
      </select>
      <input
        class="input variant-form-material grow basis-0"
        type="number"
        bind:value={$estimatedHours}
        on:input={() => filterByEstimatedHours($estimatedHoursCondition, $estimatedHours)}
      />
    </div>
  </FilterSection>

  <FilterSection label="Date Interval">
    <input type="date" />
  </FilterSection>

  <FilterSection label="Foreman">
    <input
      class="input variant-form-material"
      bind:value={$foremanName}
      on:input={filterByForeman}
    />
  </FilterSection>
</div>
