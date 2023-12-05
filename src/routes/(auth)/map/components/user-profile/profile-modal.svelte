<script lang="ts">
  import type { EmployeeInfo } from '../../../../../retrieve-employee-info';

  export let user: EmployeeInfo;
  export let showSidebar: boolean;

  $: fullName = `${user.person_first_name} ${user.person_last_name}`;

  function handleSubmit() {
    console.log('updated useer', user);
  }
</script>

{#if showSidebar}
  <div
    class=" z-10 absolute top-8 right-1/2 transform translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-solid border-transparent border-b-8 border-b-white"
  ></div>
{/if}

<div
  class="fixed top-14 right-[300px] w-72 h-max bg-white shadow-md transform translate-x-[100%] transition-transform duration-300 ease-out {showSidebar &&
    'transform translate-x-0'}"
>
  <form class="p-5 flex flex-col" on:submit|preventDefault={handleSubmit}>
    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={fullName} />

    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={user.email} />

    <label for="phone">Phone:</label>
    <input type="text" id="phone" bind:value={user.phone_number} />

    <button
      type="submit"
      class="p-2 bg-[#007bff] text-white border-none rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-[#0056b3]"
      >Update</button
    >
  </form>
</div>

<style>
  label {
    margin-bottom: 8px;
  }

  input {
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
</style>
