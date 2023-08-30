<script lang="ts">
  import { hideMapFilter } from '../stores/map-filter-store';
  import LeftArrow from 'svelte-material-icons/ArrowLeft.svelte';

  const saveAndClose = () => {
    hideMapFilter();
  };

  const clearAndClose = () => {
    hideMapFilter();
  };
</script>

<div class="flex justify-between p-6 border-slate-400 border-solid border-b">
  <button on:click={clearAndClose}>
    <LeftArrow size="32px" />
  </button>
  <div class="flex gap-4">
    <button>Clear</button>
    <button on:click={saveAndClose}>Done</button>
  </div>
</div>
