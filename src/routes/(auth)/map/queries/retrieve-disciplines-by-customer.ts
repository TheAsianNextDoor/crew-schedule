import { queryDb } from '$lib/db/query';
import type { Discipline } from '@prisma/client';

export type MapDiscipline = Pick<Discipline, 'discipline_name'>;

export const retrieveDisciplines = (customerId: string) =>
  queryDb.findMany<MapDiscipline>(
    `
      SELECT discipline_name
      FROM discipline
      WHERE customer_id = $1;
    `,
    [customerId],
  );
