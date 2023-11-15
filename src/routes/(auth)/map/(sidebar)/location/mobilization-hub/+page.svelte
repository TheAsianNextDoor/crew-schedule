<script lang="ts">
  import MobilizationHubInfo from './mobilization-hub-info.svelte';

  export let data;
</script>

{#if data.selectedEntity}
  <div class="h-screen pt-32">
    <MobilizationHubInfo selectedEntity={data.selectedEntity} />
  </div>
{/if}
