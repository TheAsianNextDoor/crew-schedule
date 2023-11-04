<script lang="ts">
  import { onDestroy } from 'svelte';
  import { selectedEntitySubscribe } from '../../stores/sidebar-store';
  import type { SiteLocation } from '../../proxy+page.server';
  import InfoSection from './info-section.svelte';

  let location: SiteLocation | undefined;

  const unsubSelectedSite = selectedEntitySubscribe((value) => {
    location = value?.location;
  });
  onDestroy(unsubSelectedSite);

  const getFormattedDate = (date: Date | null) => {
    if (!date) {
      return '';
    }

    let day: string | number = date.getDate();
    let month: string | number = date.getMonth();
    const year = date.getFullYear();

    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }

    return `${month}/${day}/${year}`;
  };
</script>

{#if location}
  <div class="h-screen pt-32">
    <div class="px-4">
      <h3 class="h3">Site Info</h3>
      <div class="px-6">
        <InfoSection header="Job Number" value={location.content.job_number} />
        <InfoSection header="Site" value={location.content.site_name} />
        <InfoSection header="Client" value={location.content.client_name} />
        <InfoSection
          header="Estimated Hours"
          value={`${location.content.estimated_hours ?? 0} hrs`}
        />
        <InfoSection header="Status" value={location.content.status_name} />
        <InfoSection header="Address" value={location.address} />
        <InfoSection
          header="Scheduled Start Date"
          value={getFormattedDate(location.content.scheduled_start_date_time)}
        />
      </div>
    </div>
    <div class="py-4">
      <hr />
    </div>
    <div class="px-4">
      <h3 class="h3">Phases</h3>
      {#each location.content.phases as phase}
        <div class="p-4">
          <div class="card shadow-md bg-surface-200-700-token border p-4">
            <InfoSection header="Foreman" value={phase.foreman_name} />
            <InfoSection header="Discipline" value={phase.discipline_name} />
            <InfoSection header="Status" value={phase.status_name} />
            <InfoSection
              header="Estimated Mobilization"
              value={`${phase.estimated_mobilization_duration ?? 0} hrs`}
            />
            <InfoSection
              header="Crew Mobilization"
              value={`${phase?.crewMobilizationHours ?? 0} hrs`}
            />
            <InfoSection header="Estimated Hours" value={`${phase.estimated_hours ?? 0} hrs`} />
            <InfoSection header="Crew Hours" value={`${phase?.crewHours ?? 0} hrs`} />
            <InfoSection header="Personnel Count" value={phase.personnel_count} />
            <InfoSection
              header="Scheduled Start"
              value={getFormattedDate(phase.scheduled_start_date_time)}
            />
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  hr {
    border: none;
    height: 0.75px;
    color: black;
    background-color: black;
  }
</style>
