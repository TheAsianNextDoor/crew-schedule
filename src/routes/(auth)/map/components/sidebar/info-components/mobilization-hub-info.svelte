<script lang="ts">
  import InfoSection from '../info-section.svelte';
  import type { HydratedMobilizationHubLocation } from '../../../+page.server';

  export let location: HydratedMobilizationHubLocation;
</script>

<div class="px-4">
  <h3 class="h3">Mobilization Hub Info</h3>
  <div class="px-6">
    <InfoSection header="Hub Name" value={location.content.name} />
    <InfoSection header="Phone Number" value={location.content.hub_phone_number} />
    <InfoSection header="Address" value={location.address} />
    <InfoSection header="Notes" value={location.content.hub_notes} />
  </div>
</div>
