<script lang="ts">
  import {
    Autocomplete,
    type AutocompleteOption,
    type PopupSettings,
    popup,
  } from '@skeletonlabs/skeleton';
  import Menu from 'svelte-material-icons/Menu.svelte';

  import type { MapSite } from '../queries/retrieve-map-sites';

  export let sites: MapSite[];

  let searchValue = '';
  let popupSettings: PopupSettings = {
    event: 'focus-click',
    target: 'popupAutocomplete',
    placement: 'bottom',
  };

  function onPopupDemoSelect(event: CustomEvent<AutocompleteOption>): void {
    searchValue = event.detail.label;
  }

  const siteOptions: AutocompleteOption[] = sites.map((site) => ({
    label: site.site_name,
    value: site.site_id,
    keywords: [site.job_number, site.status_name],
  }));
</script>

<div class="text-token w-full p-3">
  <div class="card w-full flex items-center gap-1 bg-slate-100">
    <div class="pl-4 hover:cursor-pointer">
      <Menu size="25px" />
    </div>
    <input
      class="no-outline w-10/12 border-none bg-slate-100"
      type="search"
      name="autocomplete-search"
      bind:value={searchValue}
      placeholder="Search..."
      use:popup={popupSettings}
    />
  </div>
  <div
    data-popup="popupAutocomplete"
    class="popup card w-full max-h-52 overflow-hidden absolute bg-slate-100"
  >
    <Autocomplete bind:input={searchValue} options={siteOptions} on:selection={onPopupDemoSelect} />
  </div>
</div>

<style>
  .popup {
    width: 382px;
    transform: translateX(-5px);
  }

  .no-outline:focus {
    outline: none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }
</style>
