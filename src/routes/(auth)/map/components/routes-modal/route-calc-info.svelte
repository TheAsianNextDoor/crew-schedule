<script lang="ts">
  import type { Leg } from '../../helpers/polyline-utils';
  import { routeSitesStore } from '../../stores/route-sites-store';

  export let legs: Leg[];
  export let totalDistance: number;
  export let totalDuration: number;
</script>

{#each legs as leg, index}
  <div class="p-2">
    <h1>
      {$routeSitesStore[index]?.location.content.site_name} to {$routeSitesStore[index + 1]
        ?.location.content.site_name}
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
