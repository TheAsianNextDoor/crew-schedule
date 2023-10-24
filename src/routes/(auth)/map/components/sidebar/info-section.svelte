<script lang="ts">
  export let header: string;
  export let value: Date | string | number | null;
</script>

<div class="flex gap-4">
  <h2 class="h5">
    {header}:
  </h2>
  <span>{value}</span>
</div>
