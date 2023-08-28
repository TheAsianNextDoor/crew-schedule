<script lang="ts">
  import MapDrawer from './components/map-drawer.svelte';
  import Map from './components/map.svelte';

  export let data;
</script>

<div class="z-0">
  <div class="z-20 relative">
    <MapDrawer sites={data.sites} />
  </div>
  <div class="w-full h-full z-10 absolute">
    <Map sites={data.sites} />
  </div>
</div>
