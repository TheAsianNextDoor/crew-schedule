import { type PrismaClient } from '@prisma/client';

export const phaseAssignments = async (
  prisma: PrismaClient,
  {
    phase1,
    phase2,
    phase3,
    phase4,
    phase5,
    phase6,
    phase7,
    phase8,
    phase9,
    phase10,
    phase11,
    phase12,
    phase13,
    phase14,
    crew1,
    crew2,
    crew3,
    crew4,
    crew5,
    person1,
    person2,
    person3,
    person4,
    person5,
    person6,
    person7,
    person8,
    person9,
    completed,
    in_progress,
    pending,
    scheduled,
  }: {
    phase1: string;
    phase2: string;
    phase3: string;
    phase4: string;
    phase5: string;
    phase6: string;
    phase7: string;
    phase8: string;
    phase9: string;
    phase10: string;
    phase11: string;
    phase12: string;
    phase13: string;
    phase14: string;
    crew1: string;
    crew2: string;
    crew3: string;
    crew4: string;
    crew5: string;
    person1: string;
    person2: string;
    person3: string;
    person4: string;
    person5: string;
    person6: string;
    person7: string;
    person8: string;
    person9: string;
    completed: string;
    in_progress: string;
    pending: string;
    scheduled: string;
  },
) => {
  const phaseAssignment1 = 'a1b2c3d4-e5f6-7890-1234-567890abcdef';
  const phaseAssignment2 = '09876543-2109-efcd-abcd-567890123456';
  const phaseAssignment3 = 'cdef5678-9012-3456-7890-abcdef123456';
  const phaseAssignment4 = '1234abcd-5678-efab-9012-cdef56789012';
  const phaseAssignment5 = '9a8b7c6d-5e4f-3a2b-1c0d-987654321012';
  const phaseAssignment6 = '6543210a-bcde-f987-6543-2109abcdef12';
  const phaseAssignment7 = 'ef012345-6789-abc0-def1-234567890123';
  const phaseAssignment8 = '567890ab-cdef-4567-8901-abcdef012345';
  const phaseAssignment9 = '7890cdef-0123-4567-89ab-cdef01234567';
  const phaseAssignment10 = '456789ab-cdef-0123-4567-89abcdef0123';
  const phaseAssignment11 = '90123456-789a-bcde-f012-34567890abcd';

  await prisma.phaseAssignment.createMany({
    data: [
      {
        phase_assignment_id: phaseAssignment1,
        phase_id: phase4,
        crew_id: crew1,
        foreman_id: person1,
        estimated_hours: 80.0,
        mobilization_from_location: [1.23, 4.56],
        estimated_mobilization_duration: 2.5,
        actual_mobilization_duration: null,
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: null,
        scheduled_finished_date_time: null,
        actual_finished_date_time: null,
      },
      {
        phase_assignment_id: phaseAssignment2,
        phase_id: phase5,
        crew_id: crew1,
        foreman_id: person1,
        estimated_hours: 81.0,
        mobilization_from_location: [1.23, 4.56],
        estimated_mobilization_duration: 1.5,
        actual_mobilization_duration: null,
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: null,
        scheduled_finished_date_time: null,
        actual_finished_date_time: null,
      },
      {
        phase_assignment_id: phaseAssignment3,
        phase_id: phase6,
        crew_id: crew1,
        foreman_id: person1,
        estimated_hours: 82.0,
        mobilization_from_location: [1.23, 4.56],
        estimated_mobilization_duration: 4.5,
        actual_mobilization_duration: null,
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: null,
        scheduled_finished_date_time: null,
        actual_finished_date_time: null,
      },
      {
        phase_assignment_id: phaseAssignment4,
        phase_id: phase7,
        crew_id: crew2,
        foreman_id: person2,
        estimated_hours: 84.0,
        mobilization_from_location: [1.23, 4.56],
        estimated_mobilization_duration: 9.5,
        actual_mobilization_duration: 92,
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: new Date('2023-07-20 08:00:00'),
        scheduled_finished_date_time: null,
        actual_finished_date_time: null,
      },
      {
        phase_assignment_id: phaseAssignment5,
        phase_id: phase8,
        crew_id: crew2,
        foreman_id: person2,
        estimated_hours: 86.0,
        mobilization_from_location: [1.23, 4.56],
        estimated_mobilization_duration: 7.5,
        actual_mobilization_duration: 10,
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: new Date('2023-09-20 08:00:00'),
        scheduled_finished_date_time: null,
        actual_finished_date_time: null,
      },
      {
        phase_assignment_id: phaseAssignment6,
        phase_id: phase9,
        crew_id: crew2,
        foreman_id: person2,
        estimated_hours: 89.0,
        mobilization_from_location: [1.23, 4.56],
        estimated_mobilization_duration: 23.5,
        actual_mobilization_duration: 23.0,
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: new Date('2023-08-20 08:00:00'),
        scheduled_finished_date_time: null,
        actual_finished_date_time: null,
      },
      {
        phase_assignment_id: phaseAssignment7,
        phase_id: phase10,
        crew_id: crew3,
        foreman_id: person3,
        estimated_hours: 80.0,
        mobilization_from_location: [1.23, 4.56],
        estimated_mobilization_duration: 2.5,
        actual_mobilization_duration: 10.4,
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: new Date('2023-08-20 08:00:00'),
        scheduled_finished_date_time: new Date('2023-08-21 08:00:00'),
        actual_finished_date_time: new Date('2023-08-21 08:00:00'),
      },
      {
        phase_assignment_id: phaseAssignment8,
        phase_id: phase11,
        crew_id: crew3,
        foreman_id: person3,
        estimated_hours: 813.0,
        mobilization_from_location: [1.23, 4.56],
        estimated_mobilization_duration: 3.5,
        actual_mobilization_duration: 11.9,
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: new Date('2023-08-20 08:00:00'),
        scheduled_finished_date_time: new Date('2023-08-22 08:00:00'),
        actual_finished_date_time: new Date('2023-08-22 08:00:00'),
      },
      {
        phase_assignment_id: phaseAssignment9,
        phase_id: phase12,
        crew_id: crew3,
        foreman_id: person3,
        estimated_hours: 49.0,
        mobilization_from_location: [1.23, 4.56],
        estimated_mobilization_duration: 30.5,
        actual_mobilization_duration: 10.99,
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: new Date('2023-08-20 08:00:00'),
        scheduled_finished_date_time: new Date('2023-08-23 08:00:00'),
        actual_finished_date_time: new Date('2023-08-23 08:00:00'),
      },
      {
        phase_assignment_id: phaseAssignment10,
        phase_id: phase13,
        crew_id: crew3,
        foreman_id: person3,
        estimated_hours: 49.0,
        mobilization_from_location: [1.23, 4.56],
        estimated_mobilization_duration: 30.5,
        actual_mobilization_duration: 10.99,
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: new Date('2023-08-20 08:00:00'),
        scheduled_finished_date_time: new Date('2023-08-23 08:00:00'),
        actual_finished_date_time: new Date('2023-08-23 08:00:00'),
      },
      {
        phase_assignment_id: phaseAssignment11,
        phase_id: phase14,
        crew_id: crew3,
        foreman_id: person3,
        estimated_hours: 49.0,
        mobilization_from_location: [1.23, 4.56],
        estimated_mobilization_duration: 30.5,
        actual_mobilization_duration: 10.99,
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: new Date('2023-08-20 08:00:00'),
        scheduled_finished_date_time: new Date('2023-08-23 08:00:00'),
        actual_finished_date_time: new Date('2023-08-23 08:00:00'),
      },
    ],
  });

  return {
    phaseAssignment1,
    phaseAssignment2,
    phaseAssignment3,
    phaseAssignment4,
    phaseAssignment5,
    phaseAssignment6,
    phaseAssignment7,
    phaseAssignment8,
    phaseAssignment9,
    phaseAssignment10,
    phaseAssignment11,
  };
};
