<script lang="ts">
  import { onDestroy } from 'svelte';
  import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
  import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
  import { sineIn } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import type { MapSite } from '../queries/retrieve-map-sites';
  import AutoComplete from './auto-complete.svelte';
  import { hideMapDrawer, isMapDrawerHidden, showMapDrawer } from './map-drawer-store';

  export let sites: MapSite[];

  let hidden = false;
  const unsub = isMapDrawerHidden.subscribe((value) => {
    hidden = value;
  });
  onDestroy(unsub);
</script>

<div>
  <!-- Drawer -->
  {#if !hidden}
    <div
      transition:fly={{ duration: 300, easing: sineIn, x: -320, opacity: 100 }}
      class="w-80 absolute bg-white h-screen m-0 z-20"
    >
      <button class="mt-8 absolute left-full bg-white" on:click={hideMapDrawer}>
        <ArrowLeft size="40px" />
      </button>
      <AutoComplete bind:sites />
    </div>
  {/if}
  <!-- Drawer -->

  {#if hidden}
    <button class="mt-8 absolute bg-white z-10" on:click={showMapDrawer}>
      <ArrowRight size="40px" />
    </button>
  {/if}
</div>
