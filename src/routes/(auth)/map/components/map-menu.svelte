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
      <div class="sidebar-width overflow-y-auto absolute bg-white h-screen">
        <AutoComplete bind:sites />
        <pre>{JSON.stringify(selectedSite, null, 2)}</pre>
      </div>
      <button class="arrow right-of-menu" on:click={hideMapMenu}>
        <MenuLeft size="23px" />
      </button>
    </div>
  {/if}
  <!-- Menu -->

  {#if hidden}
    <button
      transition:fly={{ duration: 300, easing: sineIn, x: 408, opacity: 0 }}
      class="arrow"
      on:click={showMapMenu}
    >
      <MenuRight size="23px" />
    </button>
  {/if}
</div>

<style>
  .sidebar-width {
    width: 408px;
    border-right: 1px solid gray;
  }

  .arrow {
    border-radius: 0 8px 8px 0;
    border-left: 1px solid gray;
    height: 3rem;
    width: 1.5rem;
    position: absolute;
    background-color: white;
    display: block;
    top: calc(50vh - 3rem);
  }

  .right-of-menu {
    left: 408px;
  }
</style>
