import { initSupabaseServerClient, supabaseServerClient } from '$lib/supabase';
import type { Handle } from '@sveltejs/kit';

import type { GithubSession } from './app';
import { retrievePersonInfo } from './retrieve-employee-info';

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
  const session = await getSession();
  event.locals.session = session;

  if (session?.user) {
    const user = await retrievePersonInfo(session.user.user_metadata.email);
    if (user) {
      event.locals.user = user;
    }
  }

  if (event?.request?.url?.includes('/auth') && !session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range';
    },
  });
};
