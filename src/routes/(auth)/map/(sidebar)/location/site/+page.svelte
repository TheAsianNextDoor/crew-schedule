<script lang="ts">
  import SiteInfo from './site-info.svelte';

  export let data;
</script>

{#if data.selectedEntity}
  <div class="h-screen pt-32">
    <SiteInfo selectedEntity={data.selectedEntity} />
  </div>
{/if}
