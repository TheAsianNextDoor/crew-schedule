<script lang="ts">
  import InfoSection from '../info-section.svelte';
  import type { HydratedSelectedMobilizationHub } from './+page.server';

  export let selectedEntity: HydratedSelectedMobilizationHub['selectedEntity'];

  $: mobilizationHub = selectedEntity.mobilizationHub;
</script>

<div class="px-4">
  <h3 class="h3">Mobilization Hub Info</h3>
  <div class="px-6">
    <InfoSection header="Hub Name" value={mobilizationHub.name} />
    <InfoSection header="Phone Number" value={mobilizationHub.hub_phone_number} />
    <InfoSection header="Address" value={selectedEntity.address} />
    <InfoSection header="Notes">
      <textarea class="textarea" value={mobilizationHub?.hub_notes} />
    </InfoSection>
  </div>
</div>
