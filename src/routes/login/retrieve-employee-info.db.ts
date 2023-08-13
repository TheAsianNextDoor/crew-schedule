import { getFirstQuery } from '$lib/db/query';
import { type person } from '@prisma/client';

export const retrieveEmployeeInfo = (email: string) => {
  const query = `
    SELECT "person_id", "customer_id"
    FROM "person"
    WHERE email = $1
  `;
  const params = [email];

  return getFirstQuery(query, params);
};
