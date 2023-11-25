<script lang="ts">
  import {
    Autocomplete,
    popup,
    type AutocompleteOption,
    type PopupSettings,
  } from '@skeletonlabs/skeleton';

  import AppSidebar from '$lib/components/app-sidebar.svelte';
  import { onDestroy } from 'svelte';
  import { selectedClickAnimation } from '../helpers/animation-helpers';
  import { isMobilizationHubLocation, isSiteLocation } from '../helpers/location-type-utils';
  import { navigateWithFilterSearchParams } from '../helpers/navigation-utils';
  import type { GenericHydratedLocation } from '../proxy+layout.server';
  import {
    getBaseHydratedMarkers,
    selectedHydratedMarkerStore,
    selectedHydratedMarkerSubscribe,
    setSelectedHydratedMarker,
  } from '../stores/map-marker-store';
  import { setSelectedEntity } from '../stores/selected-entity-store';

  export let locations: GenericHydratedLocation[];

  let searchValue = '';
  let popupSettings: PopupSettings = {
    event: 'focus-click',
    target: 'popupAutocomplete',
    placement: 'bottom',
  };

  const unsubSelectedEntity = selectedHydratedMarkerSubscribe((val) => {
    searchValue = val?.location.content.name || '';
  });

  onDestroy(() => {
    unsubSelectedEntity();
  });

  const handlePopupSelect = (event: CustomEvent<AutocompleteOption>) => {
    searchValue = event.detail.label;
    const hydratedMarker =
      getBaseHydratedMarkers().find(
        (item) => item.location.content.name === searchValue.split('(')[0].trim(),
      ) || null;

    if (hydratedMarker) {
      selectedClickAnimation(hydratedMarker.marker.content as HTMLElement);
      setSelectedHydratedMarker(hydratedMarker);
      navigateWithFilterSearchParams(
        `/map?selected-location=${hydratedMarker.location.location_id}`,
      );
    }
  };

  const siteOptions: AutocompleteOption[] = locations.map((location) => {
    if (isSiteLocation(location)) {
      const { content } = location;

      return {
        label: `${content.name} (${content.job_number})`,
        value: content.id,
        keywords: `${content.job_number}, ${content.status_name}, ${location.address}, ${content.client_name}`,
      };
    } else if (isMobilizationHubLocation(location)) {
      const { content } = location;

      return {
        label: `${content.name}`,
        value: content.id,
      };
    }
    console.error('unknown location type');

    return {
      label: `unknown type`,
      value: location.location_id,
    };
  });

  const handleCloseEntity = () => {
    searchValue = '';
    setSelectedHydratedMarker(null);
    setSelectedEntity(null);
    navigateWithFilterSearchParams('/map');
  };

  let isSidebarOpen = false;
</script>

<div class="w-full p-4">
  <div class="card w-full bg-surface-200-700-token flex items-center gap-1 px-4 shadow-md">
    <button class="hover:cursor-pointer" on:click={() => (isSidebarOpen = !isSidebarOpen)}>
      <i class="fa-solid fa-bars"></i>
    </button>
    <input
      class="bg-surface-200-700-token no-outline w-11/12 border-none bg-slate-100"
      autocomplete="off"
      name="autocomplete-search"
      bind:value={searchValue}
      placeholder="Search..."
      use:popup={popupSettings}
    />
    {#if $selectedHydratedMarkerStore}
      <button on:click={handleCloseEntity} class="hover:cursor-pointer">
        <i class="fa-solid fa-lg fa-xmark"></i>
      </button>
    {/if}
    {#if isSidebarOpen}
      <AppSidebar on:close-app-sidebar={() => (isSidebarOpen = false)} />
    {/if}
  </div>
</div>

<div
  data-popup="popupAutocomplete"
  class="popup card p-4 max-h-52 overflow-y-auto absolute bg-slate-100 z-30"
>
  <Autocomplete
    class="list"
    bind:input={searchValue}
    options={siteOptions}
    on:selection={handlePopupSelect}
  />
</div>

<style>
  .popup {
    width: 376px;
    transform: translateX(-7px);
  }

  .no-outline:focus {
    outline: none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }
</style>
