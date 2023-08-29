<script lang="ts">
  import { hideMapMenuFilter } from './map-menu-store';
  import LeftArrow from 'svelte-material-icons/ArrowLeft.svelte';

  const saveAndClose = () => {
    hideMapMenuFilter();
  };

  const clearAndClose = () => {
    hideMapMenuFilter();
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
