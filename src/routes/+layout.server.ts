import type { LayoutServerLoad } from './$types';
import { retrieveEmployeeInfo } from './login/retrieve-employee-info.db';

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.getSession();

  console.log('sesh: ', session);

  if (!session?.user?.email) {
    return {};
  }

  const employeeInfo = await retrieveEmployeeInfo(session.user.email);
  return {
    employee: {
      ...employeeInfo,
    },
    session: {
      ...session,
    },
  };
};
