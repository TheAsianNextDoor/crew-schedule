<script lang="ts">
  import { getFormattedDate } from '../../../helpers/date-utils';
  import InfoSection from '../info-section.svelte';
  import type { HydratedSiteLocation } from '../../../+page.server';
  import { flip } from 'svelte/animate';
  import DraggableList from '$lib/components/draggable-list.svelte';
  import type { HydratedMapPhase } from '../../../proxy+page.server';
  import { invalidate, invalidateAll } from '$app/navigation';
  import { dndzone, SOURCES, TRIGGERS, type DndEvent } from 'svelte-dnd-action';

  export let location: HydratedSiteLocation;
  $: phases = location.content.phases;

  let dragDisabled = true;

  const startDrag = (e: CustomEvent<DndEvent<HydratedMapPhase[]>> & { target: EventTarget }) => {
    // preventing default to prevent lag on touch devices (because of the browser checking for screen scrolling)
    e.preventDefault();
    dragDisabled = false;
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && dragDisabled) dragDisabled = false;
  };

  const handleConsider = (
    newPhases: HydratedMapPhase[],
    e: CustomEvent<DndEvent<HydratedMapPhase[]>> & { target: EventTarget },
  ) => {
    phases = newPhases;

    if (
      e.detail.info.source === SOURCES.KEYBOARD &&
      e.detail.info.trigger === TRIGGERS.DRAG_STOPPED
    ) {
      dragDisabled = true;
    }
  };

  const handleFinalize = async (
    newPhases: HydratedMapPhase[],
    e: CustomEvent<DndEvent<HydratedMapPhase[]>> & { target: EventTarget },
  ) => {
    try {
      for (let i = 0; i < newPhases.length; i += 1) {
        const { phase_id: phaseId } = newPhases[i];
        await fetch('/api/v1/auth/phase-order', {
          method: 'PATCH',
          body: JSON.stringify({
            phaseId,
            order: i,
          }),
        });
      }

      phases = newPhases;
      // await invalidateAll();

      if (e.detail.info.source === SOURCES.POINTER) {
        dragDisabled = true;
      }
    } catch (e) {
      console.log(`Issue ordering phase: ${e}`);
      newPhases = newPhases;
    }
  };
</script>

<div class="px-4">
  <h3 class="h3">Site Info</h3>
  <div class="px-6">
    <InfoSection header="Job Number" value={location.content.job_number} />
    <InfoSection header="Site" value={location.content.name} />
    <InfoSection header="Client" value={location.content.client_name} />
    <InfoSection header="Estimated Hours" value={`${location.content.estimated_hours ?? 0} hrs`} />
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
  <DraggableList
    items={phases}
    considerFunction={handleConsider}
    finalizeFunction={handleFinalize}
    bind:dragDisabled
  >
    {#each phases as phase (phase.id)}
      <div class="p-4" animate:flip={{ duration: 100 }}>
        <div class="card shadow-md bg-surface-200-700-token border p-4 relative">
          <button
            tabindex={dragDisabled ? 0 : -1}
            aria-label="drag-handle"
            style={dragDisabled ? 'cursor: grab' : 'cursor: grabbing'}
            class="absolute right-0 pr-4 cursor-grab"
            on:mousedown={startDrag}
            on:touchstart={startDrag}
            on:keydown={handleKeyDown}
          >
            <i class="fa-solid fa-grip-vertical"></i>
          </button>
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
  </DraggableList>
</div>

<style>
  hr {
    border: none;
    height: 0.75px;
    color: black;
    background-color: black;
  }
</style>
