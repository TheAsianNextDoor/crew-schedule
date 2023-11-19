<script lang="ts">
  import { clearFilterQueryParams, hideMapFilter } from './filter-store';
  import { clearFilteredHydratedMarkers } from '../../stores/map-marker-store';
  import FilterSection from './filter-section.svelte';
  import {
    filterPhaseByDateRange,
    filterPhaseByDiscipline,
    filterPhaseByEstimatedCrewHours,
    filterPhaseByForeman,
    filterPhaseByStatusName,
    filterSiteByClientName,
    filterSiteByStatusName,
  } from './handle-filter-events';
  import { STATUS_ENUM } from '$lib/constants/status';
  import { EQUALITY_ENUM } from '../../../../../lib/constants/equality';
  import { easepick } from '@easepick/core';
  import { RangePlugin } from '@easepick/range-plugin';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { FILTER_KEYS } from './filter-funcs';
  import DebouncedInput from '$lib/components/debounced-input.svelte';
  import { navigateWithFilterSearchParams } from '../../helpers/navigation-utils';

  export let data;

  let phaseDiscipline = (data?.fields?.[FILTER_KEYS.phaseDiscipline] as string | undefined) || '';
  let phaseStatus = (data?.fields?.[FILTER_KEYS.phaseStatus] as string | undefined) || '';
  let { condition: phaseCrewHoursCondition, hours: phaseCrewHours } = JSON.parse(
    (data?.fields?.[FILTER_KEYS.phaseCrewHours] as string) || '{}',
  );
  let phaseForeman = (data?.fields?.[FILTER_KEYS.phaseForeman] as string | undefined) || '';

  let siteClient = (data?.fields?.[FILTER_KEYS.siteClient] as string | undefined) || '';
  let siteStatus = (data?.fields?.[FILTER_KEYS.siteStatus] as string | undefined) || '';

  let datePickerElement: HTMLInputElement;
  let datePicker: easepick.Core;

  onMount(() => {
    datePicker = new easepick.create({
      element: datePickerElement,
      css: [
        'https://cdn.jsdelivr.net/npm/@easepick/core@1.2.1/dist/index.css',
        'https://cdn.jsdelivr.net/npm/@easepick/range-plugin@1.2.1/dist/index.css',
      ],
      plugins: [RangePlugin],
      setup: (picker) => {
        picker.on('select', () => {
          const start = picker.getStartDate();
          const end = picker.getEndDate();

          filterPhaseByDateRange({ start, end });
        });
      },
    });

    // set initial date
    let { start, end } = JSON.parse(
      (data?.fields?.[FILTER_KEYS.phaseStartDate] as string) || '{}',
    ) as { start?: Date; end?: Date };
    if (start && end) {
      datePicker.setDateRange(start, end);
    }
  });

  const saveAndClose = () => {
    hideMapFilter();
    navigateWithFilterSearchParams('/map');
  };

  const clearFilters = () => {
    goto('/map/filter');
    phaseDiscipline = '';
    phaseStatus = '';
    phaseCrewHoursCondition = EQUALITY_ENUM.eq;
    phaseCrewHours = '';
    datePicker.clear();
    phaseForeman = '';
    clearFilterQueryParams();
    clearFilteredHydratedMarkers();
  };

  const clearFiltersAndClose = async () => {
    clearFilteredHydratedMarkers();
    clearFilterQueryParams();
    hideMapFilter();
    await goto('/map');
  };
</script>

<div class="flex justify-between p-4 border-slate-400 border-solid border-b">
  <button on:click={clearFiltersAndClose}>
    <i class="fa-solid fa-arrow-left fa-lg"></i>
  </button>
  <div class="flex gap-4">
    <button on:click={clearFilters}>Clear</button>
    <button on:click={saveAndClose}>Done</button>
  </div>
</div>

<div class="py-4 px-6">
  <h1 class="h3">Phase Filters</h1>
  <FilterSection label="Discipline">
    <select
      bind:value={phaseDiscipline}
      on:change={() => filterPhaseByDiscipline(phaseDiscipline)}
      class="select"
    >
      <option selected value="">any status</option>
      {#each data.disciplines as discipline}
        <option selected value={discipline}>{discipline}</option>
      {/each}
    </select>
  </FilterSection>

  <FilterSection label="Status">
    <select
      bind:value={phaseStatus}
      on:change={() => filterPhaseByStatusName(phaseStatus)}
      class="select"
    >
      <option selected value="">any status</option>
      <option selected value={STATUS_ENUM.SOLD}>sold</option>
      <option value={STATUS_ENUM.PENDING}>pending</option>
      <option value={STATUS_ENUM.SCHEDULED}>scheduled</option>
      <option value={STATUS_ENUM.IN_PROGRESS}>in progress</option>
      <option value={STATUS_ENUM.COMPLETED}>completed</option>
    </select>
  </FilterSection>

  <FilterSection label="Estimated Crew Hours">
    <div class="flex gap-4">
      <select
        class="select w-min"
        bind:value={phaseCrewHoursCondition}
        on:change={() => filterPhaseByEstimatedCrewHours(phaseCrewHoursCondition, phaseCrewHours)}
      >
        <option value={EQUALITY_ENUM.lt}>less than</option>
        <option selected value={EQUALITY_ENUM.eq}>equal</option>
        <option value={EQUALITY_ENUM.gt}>greater than</option>
      </select>
      <input
        class="input variant-form-material grow basis-0"
        type="number"
        bind:value={phaseCrewHours}
        on:input={() => filterPhaseByEstimatedCrewHours(phaseCrewHoursCondition, phaseCrewHours)}
      />
    </div>
  </FilterSection>

  <FilterSection label="Date Interval">
    <input class="w-full text-center" placeholder="select date" bind:this={datePickerElement} />
  </FilterSection>

  <FilterSection label="Foreman">
    <DebouncedInput
      classStyles="input variant-form-material"
      value={phaseForeman}
      onInput={filterPhaseByForeman}
    />
  </FilterSection>

  <h1 class="h3">Site Filters</h1>

  <FilterSection label="Status">
    <select
      bind:value={siteStatus}
      on:change={() => filterSiteByStatusName(siteStatus)}
      class="select"
    >
      <option selected value="">any status</option>
      <option selected value={STATUS_ENUM.SOLD}>sold</option>
      <option value={STATUS_ENUM.PENDING}>pending</option>
      <option value={STATUS_ENUM.SCHEDULED}>scheduled</option>
      <option value={STATUS_ENUM.IN_PROGRESS}>in progress</option>
      <option value={STATUS_ENUM.COMPLETED}>completed</option>
    </select>
  </FilterSection>

  <FilterSection label="Client">
    <DebouncedInput
      classStyles="input variant-form-material"
      value={siteClient}
      onInput={filterSiteByClientName}
    />
  </FilterSection>
</div>
