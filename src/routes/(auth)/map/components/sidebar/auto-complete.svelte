<script lang="ts">
  import {
    Autocomplete,
    type AutocompleteOption,
    type PopupSettings,
    popup,
  } from '@skeletonlabs/skeleton';

  import {
    hideMapSidebar,
    selectedEntityStore,
    setSelectedEntity,
    showMapSidebar,
  } from '../../stores/sidebar-store';
  import { getBaseHydratedMarkers } from '../../stores/map-marker-store';
  import type { SiteLocation } from '../../proxy+page.server';

  export let locations: SiteLocation[];

  let searchValue = '';
  let popupSettings: PopupSettings = {
    event: 'focus-click',
    target: 'popupAutocomplete',
    placement: 'bottom',
  };

  const handlePopupSelect = (event: CustomEvent<AutocompleteOption>) => {
    searchValue = event.detail.label;
    setSelectedEntity(
      getBaseHydratedMarkers().find(
        (item) => item.location.content.site_name === searchValue.split('(')[0].trim(),
      ) || null,
    );
    showMapSidebar();
  };

  const siteOptions: AutocompleteOption[] = locations.map((location) => ({
    label: `${location.content.site_name} (${location.content.job_number})`,
    value: location.content.site_id,
    keywords: `${location.content.job_number}, ${location.content.status_name}, ${location.address}, ${location.content.client_name}`,
  }));

  const handleCloseEntity = () => {
    searchValue = '';
    setSelectedEntity(null);
    hideMapSidebar();
  };
</script>

<div class="w-full p-4">
  <div class="card w-full bg-slate-100 flex items-center gap-1 px-4">
    <div class="hover:cursor-pointer">
      <i class="fa-solid fa-bars"></i>
    </div>
    <input
      class="bg-surface-100-800-token no-outline w-11/12 border-none bg-slate-100"
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
