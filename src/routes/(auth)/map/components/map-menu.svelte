<script lang="ts">
  import { onDestroy } from 'svelte';
  import MenuLeft from 'svelte-material-icons/MenuLeft.svelte';
  import MenuRight from 'svelte-material-icons/MenuRight.svelte';
  import { sineIn } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import type { MapSite } from '../queries/retrieve-map-sites';
  import AutoComplete from './auto-complete.svelte';
  import { hideMapMenu, isMapMenuHidden, selectedEntity, showMapMenu } from './map-menu-store';

  export let sites: MapSite[];

  let hidden: boolean;
  let selectedSite: MapSite;

  const unsubSelectedSite = selectedEntity.subscribe((value) => {
    selectedSite = value;
  });
  onDestroy(unsubSelectedSite);

  const unsub = isMapMenuHidden.subscribe((value) => {
    hidden = value;
  });
  onDestroy(unsub);
</script>

<div>
  <!-- Menu -->
  {#if !hidden}
    <div transition:fly={{ duration: 300, easing: sineIn, x: -408, opacity: 100 }}>
      <div class="sidebar-width overflow-y-auto absolute bg-white h-screen m-0">
        <AutoComplete bind:sites />
        <pre>{JSON.stringify(selectedSite, null, 2)}</pre>
      </div>

      <button class="close-arrow mt-8 absolute bg-white" on:click={hideMapMenu}>
        <MenuLeft size="40px" />
      </button>
    </div>
  {/if}
  <!-- Menu -->

  {#if hidden}
    <button
      transition:fly={{ duration: 300, easing: sineIn, x: 408, opacity: 0 }}
      class="mt-8 absolute bg-white"
      on:click={showMapMenu}
    >
      <MenuRight size="40px" />
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
