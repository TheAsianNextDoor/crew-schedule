import { queryDb } from '$lib/db/query';
import type { Discipline, Phase, PhaseAssignment, Status } from '@prisma/client';

export type MapPhase = { id: string } & Pick<Phase, 'estimated_hours' | 'personnel_count'> &
  Pick<Status, 'status_name'> &
  Pick<Discipline, 'discipline_name'> &
  Pick<PhaseAssignment, 'scheduled_start_date_time' | 'scheduled_finished_date_time'> & {
    foreman_name: string;
  };

export const retrievePhasesBySite = (siteId: string) =>
  queryDb.findMany<MapPhase>(
    `
      SELECT
        phase.phase_id as id,
        phase.estimated_hours,
        phase.personnel_count,
        discipline.discipline_name,
        status.status_name,
        phase_assignment.scheduled_start_date_time,
        phase_assignment.scheduled_finished_date_time,
        TRIM(CONCAT(person.person_first_name, ' ',  person.person_last_name)) as foreman_name
      FROM phase
      LEFT JOIN status
        ON phase.status_id = status.status_id
      LEFT JOIN discipline
        ON phase.discipline_id = discipline.discipline_id
      LEFT JOIN phase_assignment
        ON phase.phase_id = phase_assignment.phase_id
      LEFT JOIN person
        ON phase_assignment.foreman_id = person.person_id
      WHERE phase.site_id = $1
      ORDER BY phase.order;
    `,
    [siteId],
  );
