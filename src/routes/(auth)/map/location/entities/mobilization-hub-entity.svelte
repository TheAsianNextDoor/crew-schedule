<script lang="ts">
  import InfoSection from '../info-section.svelte';
  import type { SelectedMobilizationHub } from '../../../../api/v1/auth/customer/[customerId]/location/[locationId]/mobilization-hub/retrieve-selected-mobilization-hub';
  import type { HydratedSelectedEntity } from '../../../../api/v1/auth/customer/[customerId]/location/types';

  export let selectedEntity: HydratedSelectedEntity<SelectedMobilizationHub>;
  let mobilizationHub = selectedEntity.entity;
  let address = selectedEntity.address;

  $: {
    console.log(selectedEntity);
  }
</script>

{#if mobilizationHub}
  <div class="px-4">
    <h3 class="h3">Mobilization Hub Info</h3>
    <div class="px-6">
      <InfoSection header="Hub Name" value={mobilizationHub.name} />
      <InfoSection header="Phone Number" value={mobilizationHub.hub_phone_number} />
      <InfoSection header="Address" value={address} />
      <InfoSection header="Notes">
        <textarea class="textarea" value={mobilizationHub?.hub_notes} />
      </InfoSection>
    </div>
  </div>
{/if}
