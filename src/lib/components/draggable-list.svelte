<script lang="ts">
  import { dndzone, type DndEvent, type Item } from 'svelte-dnd-action';

  // eslint-disable-next-line no-undef
  type T = $$Generic<Item>;
  export let items: T[] = [];
  export let flipDurationMs = 100;
  export let containerStyles = '';
  export let considerFunction = (
    _items: typeof items,
    _e: CustomEvent<DndEvent<(typeof items)[number]>> & { target: EventTarget & T },
  ) => {};
  export let finalizeFunction = (
    _items: typeof items,
    _e: CustomEvent<DndEvent<(typeof items)[number]>> & { target: EventTarget & T },
  ) => {};
  export let dragDisabled = false;

  const handleDndConsider = <T,>(
    e: CustomEvent<DndEvent<(typeof items)[number]>> & { target: EventTarget & T },
  ) => {
    const newOrderedList = e.detail.items;
    considerFunction(newOrderedList, e);
  };

  const handleDndFinalize = <T,>(
    e: CustomEvent<DndEvent<(typeof items)[number]>> & { target: EventTarget & T },
  ) => {
    const newOrderedList = e.detail.items;
    finalizeFunction(newOrderedList, e);
  };
</script>

<section
  on:consider={handleDndConsider}
  on:finalize={handleDndFinalize}
  class={containerStyles}
  use:dndzone={{
    items,
    flipDurationMs,
    dragDisabled,
  }}
  style="overflow-scroll"
>
  <slot />
</section>
