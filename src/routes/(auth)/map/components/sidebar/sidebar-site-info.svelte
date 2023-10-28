<script lang="ts">
  import { onDestroy } from 'svelte';
  import { selectedEntitySubscribe } from '../../stores/map-sidebar-store';
  import type { HydratedMapSite } from '../../proxy+page.server';
  import InfoSection from './info-section.svelte';

  let selectedSite: HydratedMapSite | undefined;

  const unsubSelectedSite = selectedEntitySubscribe((value) => {
    selectedSite = value?.site;
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

{#if selectedSite}
  <div class="h-screen pt-32">
    <div class="px-4">
      <h3 class="h3">Site Info</h3>
      <div class="px-6">
        <InfoSection header="Job Number" value={selectedSite.job_number} />
        <InfoSection header="Site" value={selectedSite.site_name} />
        <InfoSection header="Client" value={selectedSite.client_name} />
        <InfoSection header="Estimated Hours" value={selectedSite.estimated_hours} />
        <InfoSection header="Status" value={selectedSite.status_name} />
        <InfoSection header="Address" value={selectedSite.address} />
        <InfoSection
          header="Scheduled Start Date"
          value={getFormattedDate(selectedSite.scheduled_start_date_time)}
        />
      </div>
    </div>
    <div class="py-4">
      <hr />
    </div>
    <div class="px-4">
      <h3 class="h3">Phases</h3>
      {#each selectedSite.phases as phase}
        <div class="p-4">
          <div class="border-slate-600 border p-4">
            <InfoSection header="Foreman" value={phase.foreman_name} />
            <InfoSection header="Discipline" value={phase.discipline_name} />
            <InfoSection header="Status" value={phase.status_name} />
            <InfoSection
              header="Estimated Mobilization"
              value={phase.estimated_mobilization_duration}
            />
            <InfoSection header="Crew Mobilization" value={phase?.crewMobilizationHours} />
            <InfoSection header="Estimated Hours" value={phase.estimated_hours} />
            <InfoSection header="Crew Hours" value={phase?.crewHours} />
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
