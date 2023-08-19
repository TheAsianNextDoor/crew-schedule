import type { LayoutServerLoad } from './$types';
import { retrieveEmployeeInfo } from './login/retrieve-employee-info';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession();
  const employee = await retrieveEmployeeInfo(session.user.user_metadata.email);

  return {
    employee,
    session,
  };
};
