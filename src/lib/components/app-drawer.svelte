<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="top-0 left-0 h-screen w-[300px] px-3 py-2 bg-white flex flex-col">
  <div class="px-2 py-6 flex justify-between items-center">
    <div>
      <h1 class="text-2xl font-bold">Crew Schedule</h1>
    </div>
    <button on:click={() => dispatch('app-drawer', { isOpen: false })}>
      <i class="fa-solid fa-xmark text-xl"></i>
    </button>
  </div>

  <ul class="flex flex-col p-3 border-t border-solid border-gray-300">
    <li class="py-2 px-2 hover:bg-gray-100">
      <a href="/map" class="flex items-center gap-4">
        <i class="fa-solid fa-house fa-lg"></i>
        <span>Home</span>
      </a>
    </li>
    <li class="py-2 px-2 hover:bg-gray-100">
      <a href="/calendarV2" class="flex items-center gap-4">
        <i class="fa-regular fa-calendar fa-lg"></i>
        <span>Calendar</span>
      </a>
    </li>
    <li class="py-2 px-2 hover:bg-gray-100">
      <a href="/crew-schedule" class="flex items-center gap-4">
        <i class="fa-solid fa-person fa-lg"></i>
        <span>Crews</span>
      </a>
    </li>
    <li class="py-2 px-2 hover:bg-gray-100">
      <a href="/crew-schedule" class="flex items-center gap-4">
        <i class="fa-solid fa-map-pin fa-lg"></i>
        <span>Sites</span>
      </a>
    </li>
  </ul>
</div>
