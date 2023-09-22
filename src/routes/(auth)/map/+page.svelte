<script lang="ts">
  import MapMenu from './components/map-menu.svelte';
  import Map from './components/map.svelte';

  export let data;
</script>

<div class="z-20 relative">
  <MapMenu sites={data.sites} />
</div>
<div class="w-full h-full z-10 absolute">
  <Map
    sites={data.sites}
    Map={data.Map}
    AdvancedMarkerElement={data.AdvancedMarkerElement}
    PinElement={data.PinElement}
    LatLng={data.LatLng}
  />
</div>
