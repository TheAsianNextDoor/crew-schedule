import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

import '@fortawesome/fontawesome-free/css/all.min.css';

export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth');

  const supabase = createSupabaseLoadClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session,
  });

  // must use this session as the login page will invalidate this path
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { user } = data;

  console.log('sesh: ', session);

  return { supabase, session, user };
};
