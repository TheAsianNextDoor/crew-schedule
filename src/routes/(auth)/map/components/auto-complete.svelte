<script lang="ts">
  import {
    Autocomplete,
    type AutocompleteOption,
    type PopupSettings,
    popup,
  } from '@skeletonlabs/skeleton';

  import { getBaseHydratedMarkers } from '../stores/map-marker-store';
  import { isMobilizationHubLocation, isSiteLocation } from '../helpers/location-type-utils';
  import { selectedClickAnimation } from '../helpers/animation-helpers';
  import type { GenericHydratedLocation } from '../proxy+layout.server';
  import { selectedEntityStore, setSelectedEntity } from '../stores/selected-entity-store';
  import { goto } from '$app/navigation';
  import { hideMapSidebar } from '../(sidebar)/sidebar-store';
  import { LOCATION_TYPES_ENUM } from '$lib/constants/location-types';
  import { navigateWithFilterSearchParams } from '../helpers/navigation-utils';

  export let locations: GenericHydratedLocation[];

  let searchValue = '';
  let popupSettings: PopupSettings = {
    event: 'focus-click',
    target: 'popupAutocomplete',
    placement: 'bottom',
  };

  const handlePopupSelect = (event: CustomEvent<AutocompleteOption>) => {
    searchValue = event.detail.label;
    const hydratedMarker =
      getBaseHydratedMarkers().find(
        (item) => item.location.content.name === searchValue.split('(')[0].trim(),
      ) || null;

    if (hydratedMarker) {
      selectedClickAnimation(hydratedMarker.marker.content as HTMLElement);
      setSelectedEntity(hydratedMarker);
      if (hydratedMarker.location.type === LOCATION_TYPES_ENUM.site) {
        goto(`/map/location/site?location-id=${hydratedMarker.location.location_id}`);
      } else if (hydratedMarker.location.type === LOCATION_TYPES_ENUM.mobilizationHub) {
        goto(
          `/map/location/mobilization-hub?mobilization-hub-id=${hydratedMarker.location.location_id}`,
        );
      }
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
    setSelectedEntity(null);
    hideMapSidebar();
    navigateWithFilterSearchParams('/map');
  };
</script>

<div class="w-full p-4">
  <div class="card w-full bg-surface-200-700-token flex items-center gap-1 px-4 shadow-md">
    <div class="hover:cursor-pointer">
      <i class="fa-solid fa-bars"></i>
    </div>
    <input
      class="bg-surface-200-700-token no-outline w-11/12 border-none bg-slate-100"
      autocomplete="off"
      name="autocomplete-search"
      bind:value={searchValue}
      placeholder="Search..."
      use:popup={popupSettings}
    />
    {#if $selectedEntityStore}
      <button on:click={handleCloseEntity} class="hover:cursor-pointer">
        <i class="fa-solid fa-lg fa-xmark"></i>
      </button>
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
