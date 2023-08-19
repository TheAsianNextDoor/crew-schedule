<script lang="ts">
  import MapDrawer from './components/map-drawer.svelte';
  import Map from './components/map.svelte';

  export let data;
</script>

<div class="z-20">
  <MapDrawer sites={data.sites} />
</div>
<div class="w-full h-full absolute z-10">
  <Map sites={data.sites} />
</div>
