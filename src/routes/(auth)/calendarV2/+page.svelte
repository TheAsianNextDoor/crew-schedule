<script lang="ts">
  import { goto } from '$app/navigation';
  import { Calendar, type CalendarOptions } from '@fullcalendar/core';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import { onMount } from 'svelte';

  let calendarEl: HTMLElement;

  const calendarOptions: CalendarOptions = {
    eventColor: 'green',
    headerToolbar: {
      //   left: 'prev,next today',
      //   center: 'title myCustomButton',
      //   right: 'dayGridMonth,timeGridWeek,timeGridDay',
      center: 'myCustomButton',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    editable: true,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    events: [{ title: 'Event here', start: '2023-11-23' }],
  };

  onMount(() => {
    const calendar = new Calendar(calendarEl, {
      ...calendarOptions,
      customButtons: {
        myCustomButton: {
          text: 'Add Event',
          click: function () {
            var dateStr = prompt('Enter a date in YYYY-MM-DD format');
            var date = new Date(dateStr + 'T00:00:00');

            if (!isNaN(date.valueOf())) {
              calendar.addEvent({
                title: 'dynamic event',
                start: date,
                allDay: true,
              });
            } else {
              alert('Invalid date.');
            }
          },
        },
      },
    });
    calendar.render();
  });
</script>

<svelte:head>
  <link href="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.js"></script>
</svelte:head>

<div class="bg-white pb-2 px-1">
  <button class="hover:cursor-pointer" on:click={() => goto('/map')}>
    <i class="fa-solid fa-circle-arrow-left"></i> Back to Home
  </button>
</div>

<div id="calendar" bind:this={calendarEl} class="bg-white px-1"></div>
