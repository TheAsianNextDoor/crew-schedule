<script lang="ts">
  import type { HydratedSiteLocation } from '../proxy+layout.server';

  export let siteLocations: HydratedSiteLocation[];
</script>

<div class="pt-16" />
{#each siteLocations as location}
  <div class="p-4 hover:bg-slate-200 cursor-pointer">
    <h2 class="h5">
      {location.content.name} <span class="font-normal">({location.content.job_number})</span>
    </h2>
    <p>{location.content.client_name} | {location.content.status_name}</p>
    <p>
      {location.content.phases.length} phases | {location.shortAddress}
    </p>
    <p>{location.content.phases.map(({ discipline_name }) => discipline_name).join(' | ')}</p>
  </div>
  <hr />
{/each}
