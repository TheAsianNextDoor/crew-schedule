<script lang="ts">
  import AutoComplete from './components/auto-complete.svelte';
  import ButtonCarousel from './components/button-carousel.svelte';
  import Map from './components/map.svelte';
  import Avatar from './components/user-profile/avatar.svelte';
  import Modals from './components/modals.svelte';
  import Sidebar from './components/sidebar.svelte';
  import { isMapFilterVisibleStore } from './filter/filter-store';
  import { onMount } from 'svelte';
  import { showMapSidebar } from './stores/sidebar-store';
  import AppDrawer from '$lib/components/app-drawer.svelte';

  export let data;

  let sidebarWidth = 350;
  let isAppDrawerOpen = false;

  onMount(() => {
    showMapSidebar();
  });
</script>

<div class="absolute z-30" style="width:{sidebarWidth}px">
  {#if !$isMapFilterVisibleStore}
    <AutoComplete
      on:app-drawer={({ detail }) => {
        isAppDrawerOpen = detail.isOpen;
      }}
      locations={data.locations}
    />
  {/if}
</div>

<div class="fixed z-40 h-full">
  {#if isAppDrawerOpen}
    <AppDrawer on:app-drawer={({ detail }) => (isAppDrawerOpen = detail.isOpen)} />
  {/if}
</div>

<div class="z-20 relative">
  <div class="absolute" style="width:{sidebarWidth}px">
    <Sidebar
      {sidebarWidth}
      siteLocations={data.siteLocations}
      disciplines={data.disciplines}
      fields={data.fields}
    />
  </div>
  <div class="absolute" style="left:{sidebarWidth}px">
    <ButtonCarousel />
  </div>
</div>

<div class="w-full h-full absolute">
  <Map locations={data.locations} />
</div>

<div class="absolute right-0 z-20 flex justify-end m-5 cursor-pointer">
  <Avatar src={data.session.user.user_metadata.avatar_url} user={data.employee} />
</div>

<Modals />
