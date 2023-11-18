<script lang="ts">
  import type { EmployeeInfo } from '../../../../retrieve-employee-info';
  import ProfileModal from './profile-modal.svelte';

  export let src: string | undefined;
  export let user: EmployeeInfo;

  let showProfileModal = false;
</script>

{#if src}
  <button on:click={() => (showProfileModal = !showProfileModal)}>
    <img {src} alt="Avatar" class="w-8 h-8 rounded-full" />
  </button>
{:else}
  <button
    class="w-8 h-8 rounded-full bg-white"
    on:click={() => (showProfileModal = !showProfileModal)}
  >
    <i class="fa-solid fa-user"></i>
  </button>
{/if}

{#if showProfileModal}
  <ProfileModal {user} showSidebar={showProfileModal} />
{/if}
