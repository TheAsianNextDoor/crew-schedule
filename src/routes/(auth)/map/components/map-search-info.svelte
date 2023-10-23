<script lang="ts">
  import { onDestroy } from 'svelte';
  import { selectedEntitySubscribe } from '../stores/map-sidebar-store';
  import type { HydratedMapSite } from '../proxy+page.server';

  let selectedSite: HydratedMapSite | undefined;

  const unsubSelectedSite = selectedEntitySubscribe((value) => {
    selectedSite = value?.site;
  });
  onDestroy(unsubSelectedSite);
</script>

{#if selectedSite}
  <div class="h-screen mt-32">
    <pre>
      {JSON.stringify(selectedSite, null, 2) || ''}
    </pre>
  </div>
{/if}
