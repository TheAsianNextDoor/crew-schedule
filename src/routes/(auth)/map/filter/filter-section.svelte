<script lang="ts">
  export let label: string;
</script>

<div class="py-4">
  <h2 class="block !font-semibold">
    {label}
  </h2>

  <slot />
</div>
