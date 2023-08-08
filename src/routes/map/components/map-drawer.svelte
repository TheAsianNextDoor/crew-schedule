<script lang="ts">
  import {
    Autocomplete,
    type AutocompleteOption,
    type PopupSettings,
    popup,
  } from '@skeletonlabs/skeleton';
  import { onDestroy } from 'svelte';
  import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
  import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
  import { sineIn } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import type { MapSite } from '../queries/retrieve-map-sites';
  import { hideMapDrawer, isMapDrawerHidden, showMapDrawer } from './map-drawer-store';

  export let sites: MapSite[];

  let hidden = false;
  const unsub = isMapDrawerHidden.subscribe((value) => {
    hidden = value;
  });
  onDestroy(unsub);

  let searchValue = '';
  let popupSettings: PopupSettings = {
    event: 'focus-click',
    target: 'popupAutocomplete',
    placement: 'bottom',
  };

  function onPopupDemoSelect(event: any): void {
    searchValue = event.detail.label;
  }

  const siteOptions: AutocompleteOption[] = sites.map((site) => ({
    label: site.name,
    value: site.site_id,
    keywords: [site.job_number, site.status],
  }));
</script>

<div>
  <!-- Drawer -->
  {#if !hidden}
    <div
      class:hidden
      transition:fly={{ duration: 300, easing: sineIn, x: -320 }}
      class="w-80 relative overflow-visible bg-white h-screen"
    >
      <button class="mt-8 absolute left-full bg-white" on:click={hideMapDrawer}>
        <ArrowLeft size="40px" />
      </button>
      <div class="text-token w-full">
        <input
          class="input autocomplete"
          type="search"
          name="autocomplete-search"
          bind:value={searchValue}
          placeholder="Search..."
          use:popup={popupSettings}
        />
        <div data-popup="popupAutocomplete" class="card w-full max-h-48 overflow-hidden static">
          <Autocomplete
            bind:input={searchValue}
            options={siteOptions}
            on:selection={onPopupDemoSelect}
          />
        </div>
      </div>
    </div>
  {/if}
  <!-- Drawer -->

  {#if hidden}
    <button class="mt-8 absolute bg-white" on:click={showMapDrawer}>
      <ArrowRight size="40px" />
    </button>
  {/if}
</div>
