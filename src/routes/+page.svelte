<script lang="ts">
  import type { Provider } from '@supabase/supabase-js';

  export let data;

  $: ({ session, supabase } = data);

  const LoginWithProvider = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };
</script>

<svelte:head>
  <title>Crew Schedule</title>
  <meta name="description" content="Crew Schedule" />
</svelte:head>

{#if !session?.user}
  <section class="flex flex-col items-center justify-center h-full">
    <h1 class="h1 -translate-y-10">Sign In With</h1>
    <div class=" flex gap-4">
      <button on:click={() => LoginWithProvider('google')}>
        <i class="fa-brands fa-google fa-2xl"></i>
      </button>
      <button on:click={() => LoginWithProvider('github')}>
        <i class="fa-brands fa-github fa-2xl"></i>
      </button>
    </div>
  </section>
{:else}
  <span style="background-image: url('{session.user.user_metadata.avatar_url}')" class="avatar" />
  <a class="btn variant-filled" href="/map"> Map </a>
  <button on:click={() => signOut()} class="button">Sign out</button>
{/if}
