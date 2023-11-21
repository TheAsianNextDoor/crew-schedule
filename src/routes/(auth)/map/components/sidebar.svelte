<script lang="ts">
  import { sineIn } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import type { HydratedSiteLocation } from '../proxy+layout.server';
  import { isMapFilterVisibleStore } from '../filter/filter-store';
  import Filter from '../filter/filter.svelte';
  import type { Fields } from '../+layout';
  import SelectedEntity from '../location/selected-entity.svelte';
  import {
    hideMapSidebar,
    isMapSidebarVisibleStore,
    showMapSidebar,
  } from '../stores/sidebar-store';
  import AllSites from './all-sites.svelte';
  import { selectedEntityStore } from '../stores/selected-entity-store';

  export let disciplines: string[];
  export let fields: Fields;
  export let siteLocations: HydratedSiteLocation[];
  export let sidebarWidth: number;

  let sidebarGap = 10;

  $: calculatedSidebarWidth = fields.selectedLocation
    ? sidebarWidth * 2 + sidebarGap
    : sidebarWidth;

  const getFlyTransition = (x: number) => ({ duration: 300, easing: sineIn, x, opacity: 100 });
</script>

{#if $isMapSidebarVisibleStore}
  <div
    class="overflow-y-auto shadow-xl bg-surface-100-800-token h-screen"
    transition:fly={getFlyTransition(-calculatedSidebarWidth)}
  >
    {#if $isMapFilterVisibleStore}
      <Filter {disciplines} {fields} />
    {:else}
      <AllSites {siteLocations} />
    {/if}
  </div>
  {#if $isMapSidebarVisibleStore && $selectedEntityStore?.entity}
    <div
      style={`left: ${sidebarWidth + sidebarGap}px; width: ${sidebarWidth}px`}
      class="selected-entity absolute z-20 card overflow-y-auto shadow-xl bg-surface-100-800-token h-5/6 pt-4"
    >
      <SelectedEntity />
    </div>
  {/if}
{/if}

<!-- Close/Open Menu icon -->
{#if $isMapSidebarVisibleStore}
  <button
    transition:fly={getFlyTransition(-calculatedSidebarWidth)}
    class="arrow bg-surface-100-800-token"
    style="left:{calculatedSidebarWidth}px"
    on:click={hideMapSidebar}
  >
    <i class="fa-solid fa-caret-left"></i>
  </button>
{:else}
  <button
    transition:fly={getFlyTransition(calculatedSidebarWidth)}
    class="arrow bg-surface-100-800-token"
    on:click={showMapSidebar}
  >
    <i class="fa-solid fa-caret-right"></i>
  </button>
{/if}

<style>
  .arrow {
    border-radius: 0 8px 8px 0;
    border-left: 1px solid gray;
    height: 3rem;
    width: 1.5rem;
    position: absolute;
    display: block;
    top: calc(50vh - 3rem);
  }

  .selected-entity {
    top: 50%;
    transform: translateY(-50%);
  }
</style>
