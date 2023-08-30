<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { MapSite } from '../queries/retrieve-map-sites';
  import AutoComplete from './auto-complete.svelte';
  import { selectedEntitySubscribe } from '../stores/map-menu-store';

  export let sites: MapSite[];

  let selectedSite: MapSite;

  const unsubSelectedSite = selectedEntitySubscribe((value) => {
    selectedSite = value;
  });
  onDestroy(unsubSelectedSite);
</script>

<AutoComplete bind:sites />
<pre>{JSON.stringify(selectedSite, null, 2)}</pre>
