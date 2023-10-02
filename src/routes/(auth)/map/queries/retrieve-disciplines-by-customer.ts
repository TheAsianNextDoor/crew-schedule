import { queryDb } from '$lib/db/query';
import type { Discipline } from '@prisma/client';

export type MapDiscipline = Pick<Discipline, 'customer_id'> & Pick<Discipline, 'discipline_name'>;

export const retrieveDisciplines = () =>
  queryDb.findMany<MapDiscipline>(
    `
      SELECT
        discipline.discipline_name
      FROM discipline
    `,
  );
