<script lang="ts">
  import { LOCATION_TYPES_ENUM } from '$lib/constants/location-types';
  import { selectedEntityStore } from '../../stores/sidebar-store';
  import MobilizationHubInfo from './info-components/mobilization-hub-info.svelte';
  import SiteInfo from './info-components/site-info.svelte';

  $: locationType = $selectedEntityStore?.location.type;

  const getInfoComponent = (locationType: keyof typeof LOCATION_TYPES_ENUM | undefined) => {
    if (locationType === LOCATION_TYPES_ENUM.mobilizationHub) {
      return MobilizationHubInfo;
    }

    if (locationType === LOCATION_TYPES_ENUM.site) {
      return SiteInfo;
    }
  };
</script>

{#if $selectedEntityStore?.location}
  <div class="h-screen pt-32">
    <svelte:component
      this={getInfoComponent(locationType)}
      location={$selectedEntityStore.location}
    />
  </div>
{/if}
