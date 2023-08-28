<script lang="ts">
  import { onDestroy } from 'svelte';
  import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
  import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
  import { sineIn } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import type { MapSite } from '../queries/retrieve-map-sites';
  import AutoComplete from './auto-complete.svelte';
  import {
    hideMapDrawer,
    isMapDrawerHidden,
    selectedEntity,
    showMapDrawer,
  } from './map-drawer-store';

  export let sites: MapSite[];

  let hidden: boolean;
  let selectedSite: MapSite;

  const unsubSelectedSite = selectedEntity.subscribe((value) => {
    selectedSite = value;
  });
  onDestroy(unsubSelectedSite);

  const unsub = isMapDrawerHidden.subscribe((value) => {
    hidden = value;
  });
  onDestroy(unsub);
</script>

<div>
  <!-- Drawer -->
  {#if !hidden}
    <div transition:fly={{ duration: 300, easing: sineIn, x: -408, opacity: 100 }}>
      <div class="sidebar-width overflow-y-auto absolute bg-white h-screen m-0">
        <AutoComplete bind:sites />
        <pre>{JSON.stringify(selectedSite, null, 2)}</pre>
      </div>

      <button class="close-arrow mt-8 absolute bg-white" on:click={hideMapDrawer}>
        <ArrowLeft size="40px" />
      </button>
    </div>
  {/if}
  <!-- Drawer -->

  {#if hidden}
    <button
      transition:fly={{ duration: 300, easing: sineIn, x: 408, opacity: 0 }}
      class="mt-8 absolute bg-white"
      on:click={showMapDrawer}
    >
      <ArrowRight size="40px" />
    </button>
  {/if}
</div>

<style>
  .sidebar-width {
    width: 408px;
  }

  .close-arrow {
    left: 408px;
  }
</style>
