<script lang="ts">
  import Map from './map.svelte';

  export let data;
</script>

<div class="map-container">
  <Map sites={data.sites} />
</div>

<style>
  .map-container {
    height: 400px;
  }
</style>
