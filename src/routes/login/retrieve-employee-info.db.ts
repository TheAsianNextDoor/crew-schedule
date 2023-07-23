import { getFirstQuery } from '$lib/db/query';

export const retrieveEmployeeInfo = (email: string) => {
  const query = `
    SELECT "id", "company_id"
    FROM "employee"
    WHERE email = $1
  `;
  const params = [email];

  return getFirstQuery(query, params);
};
