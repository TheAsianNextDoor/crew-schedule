<script lang="ts">
  import { Button, CloseButton, Drawer } from 'flowbite-svelte';
  import { Search } from 'flowbite-svelte';
  import type { drawerTransitionParamTypes } from 'flowbite-svelte/dist/types';
  import { onDestroy } from 'svelte';
  import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
  import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
  import { sineIn } from 'svelte/easing';
  import { quintOut } from 'svelte/easing';
  import { type FlyParams, fly } from 'svelte/transition';
  import { crossfade } from 'svelte/transition';

  import { hideMapDrawer, isMapDrawerHidden, showMapDrawer } from './map-drawer-store';

  let hidden = true;
  const unsub = isMapDrawerHidden.subscribe((value) => {
    hidden = value;
  });

  const [send, receive] = crossfade({
    duration: 200,
    easing: sineIn,
  });

  let transitionParams: drawerTransitionParamTypes = {
    x: -320,
    duration: 200,
    easing: sineIn,
    opacity: 100,
  };

  onDestroy(unsub);
</script>

<div>
  <Drawer
    transitionType="fly"
    bgOpacity="bg-opacity-0"
    activateClickOutside={false}
    backdrop={false}
    {transitionParams}
    bind:hidden
    id="sidebar"
    class="relative h-screen overflow-visible"
  >
    {#if !hidden}
      <button
        class="hide-arrow"
        in:send={{ key: 'a' }}
        out:receive={{ key: 'b' }}
        on:click={hideMapDrawer}
      >
        <ArrowLeft size="40px" />
      </button>
    {/if}
    <div class="flex items-center relative">
      <Search>
        <Button>Search</Button>
      </Search>
    </div>
  </Drawer>

  {#if hidden}
    <button
      class="show-arrow"
      in:send={{ key: 'b' }}
      out:receive={{ key: 'a' }}
      on:click={showMapDrawer}
    >
      <ArrowRight size="40px" />
    </button>
  {/if}
</div>

<style>
  .hide-arrow {
    margin-top: 2rem;
    position: absolute;
    left: 100%;
    background-color: white;
  }

  .show-arrow {
    margin-top: 3rem;
    position: absolute;
    background-color: white;
  }
</style>
