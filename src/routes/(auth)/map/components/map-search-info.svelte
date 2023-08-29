<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { MapSite } from '../queries/retrieve-map-sites';
  import AutoComplete from './auto-complete.svelte';
  import { selectedEntity } from './map-menu-store';

  export let sites: MapSite[];

  let selectedSite: MapSite;

  const unsubSelectedSite = selectedEntity.subscribe((value) => {
    selectedSite = value;
  });
  onDestroy(unsubSelectedSite);
</script>

<div class="sidebar-width overflow-y-auto absolute bg-white h-screen">
  <AutoComplete bind:sites />
  <pre>{JSON.stringify(selectedSite, null, 2)}</pre>
</div>

<style>
  .sidebar-width {
    width: 408px;
    border-right: 1px solid gray;
  }
</style>
