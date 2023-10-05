<script>
  import { onMount } from 'svelte';
  import { invalidate } from '$app/navigation';

  import { initializeStores, AppShell } from '@skeletonlabs/skeleton';
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';

  import './styles.css';
  import '../app.postcss';
  import Header from './Header.svelte';

  export let data;

  initializeStores();
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => subscription.unsubscribe();
  });
</script>

<slot />

<!-- <AppShell class="h-full">
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>

  <svelte:fragment slot="sidebarLeft"></svelte:fragment>
  <slot />
</AppShell> -->
