<script lang="ts">
  import type { Leg } from '../../helpers/polyline-utils';
  import { matrixSitesStore } from '../../stores/matrix-sites-store';

  export let legs: Leg[];
</script>

{#each legs as leg, index}
  <div class="p-2">
    <h1>
      {$matrixSitesStore.origin?.location.content.name} to {$matrixSitesStore.destinations[index]
        .location.content.name}
    </h1>
    <div>Distance: {leg.localizedValues.distance.text}</div>
    <div>Duration: {leg.localizedValues.duration.text}</div>
  </div>
{/each}
