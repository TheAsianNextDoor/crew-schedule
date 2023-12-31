<script lang="ts">
  import { clearFilteredHydratedMarkers } from '../stores/map-marker-store';

  import { STATUS_ENUM } from '$lib/constants/status';
  import { EQUALITY_ENUM } from '../../../../lib/constants/equality';
  import { easepick } from '@easepick/core';
  import { RangePlugin } from '@easepick/range-plugin';
  import { onMount } from 'svelte';
  import DebouncedInput from '$lib/components/debounced-input.svelte';
  import {
    getSelectedLocationSearchParam,
    navigateWithFilterSearchParams,
  } from '../helpers/navigation-utils';
  import { capitalizeFirstLetter } from '$lib/utils/string-utils';
  import {
    filterPhaseByDateRange,
    filterPhaseByDiscipline,
    filterPhaseByEstimatedCrewHours,
    filterPhaseByForeman,
    filterPhaseByStatusName,
    filterSiteByClientName,
    filterSiteByStatusName,
  } from './handle-filter-events';
  import { clearFilterQueryParams, hideMapFilter } from './filter-store';
  import FilterSection from './filter-section.svelte';
  import { goto } from '$app/navigation';
  import type { Fields } from '../+layout';

  export let fields: Fields;
  export let disciplines: string[];

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
    let { start, end } = fields.phaseStartDate;
    if (start && end) {
      datePicker.setDateRange(start, end);
    }
  });

  const saveAndClose = () => {
    hideMapFilter();
    navigateWithFilterSearchParams(`/map?${getSelectedLocationSearchParam()}`);
  };

  const clearFilters = () => {
    clearFilterQueryParams();
    clearFilteredHydratedMarkers();
    goto(`/map?${getSelectedLocationSearchParam()}`);
  };

  const clearFiltersAndClose = async () => {
    clearFilteredHydratedMarkers();
    clearFilterQueryParams();
    hideMapFilter();
    goto(`/map?${getSelectedLocationSearchParam()}`);
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
    {#each disciplines as discipline}
      <label class="flex items-center space-x-2">
        <input
          class="checkbox"
          type="checkbox"
          value={discipline}
          checked={fields.phaseDisciplines?.includes(discipline)}
          on:click={filterPhaseByDiscipline}
        />
        <p>{capitalizeFirstLetter(discipline)}</p>
      </label>
    {/each}
  </FilterSection>

  <FilterSection label="Status">
    <select value={fields.phaseStatus} on:change={filterPhaseByStatusName} class="select">
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
        value={fields.crewHoursValue.condition || EQUALITY_ENUM.eq}
        on:change={(evt) =>
          filterPhaseByEstimatedCrewHours(evt.target?.value, fields.crewHoursValue.hours || '0')}
      >
        <option value={EQUALITY_ENUM.lt}>less than</option>
        <option selected value={EQUALITY_ENUM.eq}>equal</option>
        <option value={EQUALITY_ENUM.gt}>greater than</option>
      </select>
      <input
        class="input variant-form-material grow basis-0"
        type="number"
        value={fields.crewHoursValue.hours || ''}
        on:input={(evt) =>
          filterPhaseByEstimatedCrewHours(
            fields.crewHoursValue.condition || EQUALITY_ENUM.eq,
            evt.target?.value,
          )}
      />
    </div>
  </FilterSection>

  <FilterSection label="Date Interval">
    <input class="w-full text-center" placeholder="select date" bind:this={datePickerElement} />
  </FilterSection>

  <FilterSection label="Foreman">
    <DebouncedInput
      classStyles="input variant-form-material"
      value={fields.phaseForeman}
      onInput={filterPhaseByForeman}
    />
  </FilterSection>

  <h1 class="h3">Site Filters</h1>

  <FilterSection label="Status">
    <select value={fields.siteStatus} on:change={filterSiteByStatusName} class="select">
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
      value={fields.siteClient}
      onInput={filterSiteByClientName}
    />
  </FilterSection>
</div>
