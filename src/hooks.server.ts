import { initSupabaseServerClient, supabaseServerClient } from '$lib/supabase';
import type { Handle } from '@sveltejs/kit';

import type { GithubSession } from './app';

export const handle: Handle = async ({ event, resolve }) => {
  initSupabaseServerClient(event);
  event.locals.supabase = supabaseServerClient;

  const getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();

    return session as GithubSession;
  };

  event.locals.getSession = getSession;

  if (event?.request?.url?.includes('/auth')) {
    const session = await getSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range';
    },
  });
};
