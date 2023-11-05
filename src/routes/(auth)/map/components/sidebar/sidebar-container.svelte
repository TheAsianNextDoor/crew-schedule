<script lang="ts">
  import { sineIn } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import { isMapFilterVisibleStore } from '../../stores/filter-store';
  import SidebarContent from './sidebar-content.svelte';
  import SidebarFilter from './sidebar-filter.svelte';
  import {
    hideMapSidebar,
    showMapSidebar,
    selectedEntityStore,
    isMapSidebarVisibleStore,
  } from '../../stores/sidebar-store';

  export let disciplines: string[];
  export let sidebarWidth: number;

  const getFlyTransition = (x: number) => ({ duration: 300, easing: sineIn, x, opacity: 100 });
</script>

{#if $isMapSidebarVisibleStore}
  <div
    class="overflow-y-auto shadow-xl bg-surface-100-800-token h-screen"
    transition:fly={getFlyTransition(-sidebarWidth)}
  >
    {#if $isMapFilterVisibleStore}
      <SidebarFilter bind:disciplines />
    {:else if $selectedEntityStore}
      <SidebarContent />
    {/if}
  </div>
{/if}

<!-- Close/Open Menu icon -->
{#if $isMapSidebarVisibleStore}
  <button
    transition:fly={getFlyTransition(-sidebarWidth)}
    class="arrow bg-surface-100-800-token"
    style="left:{sidebarWidth}px"
    on:click={hideMapSidebar}
  >
    <i class="fa-solid fa-caret-left"></i>
  </button>
{:else}
  <button
    transition:fly={getFlyTransition(sidebarWidth)}
    class="arrow bg-surface-100-800-token"
    on:click={showMapSidebar}
  >
    <i class="fa-solid fa-caret-right"></i>
  </button>
{/if}

<style>
  /* .sidebar-width {
    width: 408px;
    */

  /* @media (max-width: 767px) {
      width: 100%;
    } */
  /*} */

  .arrow {
    border-radius: 0 8px 8px 0;
    border-left: 1px solid gray;
    height: 3rem;
    width: 1.5rem;
    position: absolute;
    display: block;
    top: calc(50vh - 3rem);
  }
</style>
