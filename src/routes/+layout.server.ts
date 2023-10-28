import type { LayoutServerLoad } from './$types';
import { retrievePersonInfo, type EmployeeInfo } from './retrieve-employee-info';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession();

  let employee: EmployeeInfo | undefined;
  if (session?.user) {
    employee = await retrievePersonInfo(session.user.user_metadata.email);
  }

  return {
    employee,
    session,
  };
};
