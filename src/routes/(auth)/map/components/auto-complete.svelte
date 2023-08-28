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
  <div class="w-full flex flex-row items-center">
    <div class="card w-full flex items-center">
      <Menu class="ml-4 hover:cursor-pointer" size="25px" />
      <input
        class="no-outline w-10/12 border-none bg-surface-100"
        type="search"
        name="autocomplete-search"
        bind:value={searchValue}
        placeholder="Search..."
        use:popup={popupSettings}
      />
    </div>
  </div>
  <div data-popup="popupAutocomplete" class="card w-full max-h-52 overflow-hidden static">
    <Autocomplete bind:input={searchValue} options={siteOptions} on:selection={onPopupDemoSelect} />
  </div>
</div>

<style>
  .no-outline:focus {
    outline: none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }
</style>
