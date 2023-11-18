<script lang="ts">
  export let classStyles = '';
  export let value: string;
  export let onInput = (_value: string) => {};
  export let debounceTime = 750;

  let timer: ReturnType<typeof setTimeout>;

  const debouncedInput = (event: Event) => {
    const { value } = event.target as HTMLInputElement;

    clearTimeout(timer);
    timer = setTimeout(() => {
      onInput(value);
    }, debounceTime);
  };
</script>

<input class={classStyles} on:input={debouncedInput} bind:value />
