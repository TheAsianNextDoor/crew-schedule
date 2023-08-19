import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
  const { session, employee } = await parent();

  if (employee?.role_name !== 'ADMIN') {
    throw redirect(303, '/login');
  }

  return {
    employee,
    session,
  };
};
