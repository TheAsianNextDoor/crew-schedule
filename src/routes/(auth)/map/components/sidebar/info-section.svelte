<script lang="ts">
  export let header: string;
  export let value: Date | string | number | null | undefined;
</script>

<div class="flex gap-4 items-center">
  <h2 class="h6 whitespace-nowrap">{header}:</h2>
  {#if value}
    <span title={value.toString()} class="text-ellipsis whitespace-nowrap overflow-hidden"
      >{value}</span
    >
  {/if}
</div>
