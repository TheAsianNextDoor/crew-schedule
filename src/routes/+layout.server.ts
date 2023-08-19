import type { Person } from '@prisma/client';

import type { LayoutServerLoad } from './$types';
import { retrieveEmployeeInfo } from './login/retrieve-employee-info';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession();

  let employee: Person | undefined;
  if (session?.user) {
    employee = await retrieveEmployeeInfo(session.user.user_metadata.email);
  }

  return {
    employee,
    session,
  };
};
