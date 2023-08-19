import { queryDb } from '$lib/db/query';
import type { Person } from '@prisma/client';

export const retrieveEmployeeInfo = (email: string) =>
  queryDb.findFirst<Person>(
    `
    SELECT 
      person.*,
      role.role_name
    FROM "person"
    LEFT JOIN "role"
      ON person.role_id = "role".role_id
    WHERE email = $1 
  `,
    [email]
  );
