import { type PrismaClient } from '@prisma/client';

export const phases = async (
  prisma: PrismaClient,
  {
    site1,
    site2,
    site3,
    site4,
    site5,
    site6,
    site7,
    site8,
    site9,
    site10,
    site11,
    site12,
    pending,
    completed,
    in_progress,
    scheduled,
    asphalt,
    concrete,
    striping,
  }: {
    site1: string;
    site2: string;
    site3: string;
    site4: string;
    site5: string;
    site6: string;
    site7: string;
    site8: string;
    site9: string;
    site10: string;
    site11: string;
    site12: string;
    pending: string;
    completed: string;
    in_progress: string;
    scheduled: string;
    asphalt: string;
    concrete: string;
    striping: string;
  },
) => {
  const phase1 = '75f5a2c6-6d9f-4f5d-9b10-3b5e5a785bfc';
  const phase2 = 'e6e54d98-7c6a-46a2-a1a9-8c44b15d7f6e';
  const phase3 = 'b982d1e5-8d61-4a67-ae6c-218a78bc9b19';
  const phase4 = '6f5e89d7-3eab-4b16-9e2c-87c8e420c4f1';
  const phase5 = '4d7c6e89-218a-457b-93f6-e5d1c3b2a980';
  const phase6 = 'a8b4c592-e6f3-45d8-b9c7-2a1e34f5d6e7';
  const phase7 = 'f9e8d7c6-b5a4-42c3-8192-6f1e0d3c9a8b';
  const phase8 = '71625384-9a8b-4c6d-b5e7-f821304d5c9e';
  const phase9 = 'c8b7a69e-4d3c-2b1a-1e0f-9d8c7b6a5f4e';
  const phase10 = '5a4b3c2d-1e0f-9d8c-7b6a-c5b4a3d2e1f0';
  const phase11 = 'efcdab89-0123-4567-89ab-cdef01234567';
  const phase12 = '12345678-0123-0123-0123-0123456789ab';
  const phase13 = '98765432-5432-5432-5432-210987654321';
  const phase14 = '55555555-aaaa-bbbb-1234-555555555555';

  await prisma.phase.createMany({
    data: [
      {
        phase_id: phase1,
        site_id: site4,
        sub_contractor_id: null,
        discipline_id: asphalt,
        order: 1,
        status_id: pending,
        estimated_hours: null,
        personnel_count: null,
      },

      {
        phase_id: phase2,
        site_id: site5,
        sub_contractor_id: null,
        discipline_id: concrete,
        order: 1,
        status_id: pending,
        estimated_hours: null,
        personnel_count: null,
      },
      {
        phase_id: phase4,
        site_id: site5,
        sub_contractor_id: null,
        discipline_id: asphalt,
        order: 2,
        status_id: scheduled,
        estimated_hours: 32,
        personnel_count: 12,
      },

      {
        phase_id: phase5,
        site_id: site6,
        sub_contractor_id: null,
        discipline_id: concrete,
        order: 1,
        status_id: scheduled,
        estimated_hours: 19,
        personnel_count: 91,
      },

      {
        phase_id: phase7,
        site_id: site7,
        sub_contractor_id: null,
        discipline_id: asphalt,
        order: 1,
        status_id: in_progress,
        estimated_hours: 22.9,
        personnel_count: 128,
      },

      {
        phase_id: phase8,
        site_id: site8,
        sub_contractor_id: null,
        discipline_id: concrete,
        order: 1,
        status_id: in_progress,
        estimated_hours: 222.9,
        personnel_count: 125,
      },
      {
        phase_id: phase3,
        site_id: site8,
        sub_contractor_id: null,
        discipline_id: striping,
        order: 2,
        status_id: pending,
        estimated_hours: null,
        personnel_count: null,
      },

      {
        phase_id: phase12,
        site_id: site9,
        sub_contractor_id: null,
        discipline_id: striping,
        order: 1,
        status_id: completed,
        estimated_hours: 29,
        personnel_count: 1203,
      },
      {
        phase_id: phase9,
        site_id: site9,
        sub_contractor_id: null,
        discipline_id: striping,
        order: 2,
        status_id: in_progress,
        estimated_hours: 22.0,
        personnel_count: 13,
      },
      {
        phase_id: phase6,
        site_id: site9,
        sub_contractor_id: null,
        discipline_id: striping,
        order: 3,
        status_id: scheduled,
        estimated_hours: 22,
        personnel_count: 123,
      },

      {
        phase_id: phase10,
        site_id: site10,
        sub_contractor_id: null,
        discipline_id: asphalt,
        order: 1,
        status_id: completed,
        estimated_hours: 22,
        personnel_count: 23,
      },
      {
        phase_id: phase11,
        site_id: site10,
        sub_contractor_id: null,
        discipline_id: concrete,
        order: 2,
        status_id: completed,
        estimated_hours: 23,
        personnel_count: 322,
      },

      {
        phase_id: phase13,
        site_id: site11,
        sub_contractor_id: null,
        discipline_id: concrete,
        order: 1,
        status_id: completed,
        estimated_hours: 23,
        personnel_count: 322,
      },

      {
        phase_id: phase14,
        site_id: site12,
        sub_contractor_id: null,
        discipline_id: concrete,
        order: 1,
        status_id: completed,
        estimated_hours: 23,
        personnel_count: 322,
      },
    ],
  });

  return {
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
  };
};
