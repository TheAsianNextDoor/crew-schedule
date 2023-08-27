<script>
  import './styles.css';
  // Your selected Skeleton theme:
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

  // This contains the bulk of Skeletons required styles:
  import '@skeletonlabs/skeleton/styles/skeleton.css';

  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  import '../app.postcss';

  // skeleton popups
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  import { invalidate } from '$app/navigation';

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => subscription.unsubscribe();
  });
</script>

<div class="app">
  <!-- <Header /> -->

  <main>
    <slot />
  </main>

  <!-- <footer>
    <p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
  </footer> -->
</div>

<style>
  .app {
    height: 100%;
  }

  main {
    width: 100%;
    height: 100%;
  }

  /* footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  } */
</style>
