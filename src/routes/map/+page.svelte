<script lang="ts">
  import Map from '$lib/components/map.svelte';

  export let data;

  console.log('hi: ', data);
</script>

<div class="map-container">
  <Map />
</div>

<style>
  .map-container {
    height: 400px;
  }
</style>
