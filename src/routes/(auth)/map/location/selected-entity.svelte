<script lang="ts">
  import { LOCATION_TYPES_ENUM } from '$lib/constants/location-types';
  import { selectedEntityStore } from '../stores/selected-entity-store';
  import MobilizationHubEntity from './entities/mobilization-hub-entity.svelte';
  import SiteEntity from './entities/site-entity.svelte';

  $: locationType = $selectedEntityStore?.type;

  const getInfoComponent = (locationType: keyof typeof LOCATION_TYPES_ENUM | undefined) => {
    if (locationType === LOCATION_TYPES_ENUM.mobilizationHub) {
      return MobilizationHubEntity;
    }
    if (locationType === LOCATION_TYPES_ENUM.site) {
      return SiteEntity;
    }
  };
</script>

{#if $selectedEntityStore?.entity}
  <svelte:component this={getInfoComponent(locationType)} />
{/if}
