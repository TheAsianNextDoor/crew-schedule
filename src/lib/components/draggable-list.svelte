<script lang="ts">
  import { dndzone, type DndEvent, type Item } from 'svelte-dnd-action';

  // eslint-disable-next-line no-undef
  type T = $$Generic<Item>;
  export let items: T[] = [];
  export let flipDurationMs = 100;
  export let considerFunction = (_items: typeof items) => {};
  export let finalizeFunction = (_items: typeof items) => {};

  const handleDndConsider = <T,>(
    e: CustomEvent<DndEvent<(typeof items)[number]>> & { target: EventTarget & T },
  ) => {
    const newOrderedList = e.detail.items;
    considerFunction(newOrderedList);
  };

  const handleDndFinalize = <T,>(
    e: CustomEvent<DndEvent<(typeof items)[number]>> & { target: EventTarget & T },
  ) => {
    const newOrderedList = e.detail.items;
    finalizeFunction(newOrderedList);
  };
</script>

<section
  on:consider={handleDndConsider}
  on:finalize={handleDndFinalize}
  class="flex flex-col gap-y-1"
  use:dndzone={{ items, flipDurationMs }}
>
  <slot />
</section>
