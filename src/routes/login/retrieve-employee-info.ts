import { queryDb } from '$lib/db/query';
import type { Person } from '@prisma/client';

export const retrieveEmployeeInfo = (email: string) =>
  queryDb.findFirst<Person>(
    `
    SELECT "person_id", "customer_id"
    FROM "person"
    WHERE email = $1 
  `,
    [email]
  );
