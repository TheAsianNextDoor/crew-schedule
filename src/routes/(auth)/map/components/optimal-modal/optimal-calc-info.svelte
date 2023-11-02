<script lang="ts">
  import type { Leg } from '../../helpers/polyline-utils';
  import { mapRoutesStore } from '../../stores/map-routes-store';

  export let legs: Leg[];
  export let totalDistance: number;
  export let totalDuration: number;
</script>

{#each legs as leg, index}
  <div class="p-2">
    <h1>
      {$mapRoutesStore[index]?.site?.site_name} to {$mapRoutesStore[index + 1]?.site?.site_name}
    </h1>
    <div>Distance: {leg.localizedValues.distance.text}</div>
    <div>Duration: {leg.localizedValues.duration.text}</div>
  </div>
{/each}
<div>
  <h1>Total</h1>
  <div>Total Distance: {totalDistance} mi</div>
  <div>Total Distance: {totalDuration} mins</div>
</div>
