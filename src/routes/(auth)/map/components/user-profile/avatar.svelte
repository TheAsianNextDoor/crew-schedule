<script lang="ts">
  import type { EmployeeInfo } from '../../../../retrieve-employee-info';
  import ProfileModal from './profile-modal.svelte';

  export let src: string = 'images/no-face.png';
  export let user: EmployeeInfo;
  let showSidebar = false;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<img
  {src}
  alt="Avatar"
  class="w-8 h-8 rounded-full"
  on:click={() => (showSidebar = !showSidebar)}
/>
{#if showSidebar}
  <ProfileModal {user} {showSidebar} />
{/if}
