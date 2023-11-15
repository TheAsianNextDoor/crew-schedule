import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
  const { session, employee } = await parent();

  if (!session || !employee) {
    throw redirect(303, '/');
  }

  return {
    employee,
    session,
  };
};
