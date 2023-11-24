<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="fixed top-0 left-0 h-screen w-[350px] px-3 py-2 bg-white">
  <div class="px-2 py-6 flex justify-between items-center">
    <div>
      <h1 class="text-2xl font-bold">Crew Schedule</h1>
    </div>
    <button on:click={() => dispatch('close-app-sidebar')}>
      <i class="fa-solid fa-xmark text-xl"></i>
    </button>
  </div>
  <ul class="flex flex-col p-3 border-t border-solid border-gray-300">
    <li class="py-2 px-2 hover:bg-gray-100">
      <a href="/map" class="flex items-center">
        <i class="fa-solid fa-house flex-1"></i>
        <span class="ml-2 flex-[4]">Home</span>
      </a>
    </li>
    <li class="py-2 px-2 hover:bg-gray-100">
      <a href="/calendarV2" class="flex items-center">
        <i class="fa-regular fa-calendar flex-1"></i>
        <span class="ml-2 flex-[4]">Calendar</span>
      </a>
    </li>
    <li class="py-2 px-2 hover:bg-gray-100">
      <a href="/crew-schedule" class="flex items-center">
        <i class="fa-solid fa-person flex-1"></i>
        <span class="ml-2 flex-[4]">Crews</span>
      </a>
    </li>
    <li class="py-2 px-2 hover:bg-gray-100">
      <a href="/crew-schedule" class="flex items-center">
        <i class="fa-solid fa-map-pin flex-1"></i>
        <span class="ml-2 flex-[4]">Sites</span>
      </a>
    </li>
  </ul>
</div>
