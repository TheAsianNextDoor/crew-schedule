<script lang="ts">
  export let label: string;
</script>

<div class="py-4">
  <span class="block">
    {label}
  </span>

  <slot />
</div>
