<script lang="ts">
  import type { MatrixItem } from '../../../../api/v1/auth/matrix/get-google-matrix';
  import type { MatrixStore } from '../../stores/matrix-sites-store';

  export let matrices: MatrixStore;
  export let edges: MatrixItem[];
</script>

{#each edges as edge}
  <div class="p-2">
    <h1>
      {matrices.origin?.location.content.name} to {matrices.destinations[edge.destinationIndex]
        ?.location.content.name}
    </h1>
    <div>Distance: {edge.distanceMeters}</div>
    <div>Duration: {edge.staticDuration}</div>
  </div>
{/each}
