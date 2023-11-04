import { type PrismaClient } from '@prisma/client';

export const sites = async (
  prisma: PrismaClient,
  {
    location1,
    location2,
    location3,
    location4,
    location5,
    location6,
    location7,
    location8,
    location9,
    location10,
    location11,
    location12,
    customer1,
    client1,
    client2,
    client3,
    client4,
    client5,
    pending,
    completed,
    in_progress,
    scheduled,
  }: {
    location1: string;
    location2: string;
    location3: string;
    location4: string;
    location5: string;
    location6: string;
    location7: string;
    location8: string;
    location9: string;
    location10: string;
    location11: string;
    location12: string;
    customer1: string;
    client1: string;
    client2: string;
    client3: string;
    client4: string;
    client5: string;
    pending: string;
    completed: string;
    in_progress: string;
    scheduled: string;
  },
) => {
  const site1 = '123b7483-803d-4b34-b519-48f28061d924';
  const site2 = 'd8a1e1a2-9d46-4a0e-97c3-7a94d8e35782';
  const site3 = '589c722f-16ea-4c5f-8e96-1eab3c9e5f88';
  const site4 = 'b394d865-4efc-42f7-96f8-7be625c6f0d9';
  const site5 = '7c87a7d3-3e91-467f-987d-c0e33f9886b2';
  const site6 = 'f1e7c08c-af1b-4e90-9b77-5679c296b6a0';
  const site7 = '9db4e2b1-ae18-4276-9ea1-54d46e0d320f';
  const site8 = 'e3e9f5bf-5e61-4d09-94d7-b46a811877d0';
  const site9 = 'c3b983f7-1353-49e5-b2a6-5d4969decaec';
  const site10 = '2bfa92d8-9127-4f8b-95ab-52616ea6b123';
  const site11 = 'aabb32cf-0457-4d72-8a42-0c7c58618f8d';
  const site12 = 'ae06b168-277e-11ee-be56-0242ac120002';

  await prisma.site.createMany({
    data: [
      {
        site_id: site1,
        location_id: location1,
        customer_id: customer1,
        client_id: client1,
        job_number: 'Job001',
        site_name: 'Site 1',
        status_id: pending,
        cluster_id: 'Cluster A',
        estimated_hours: 200.0,
        notes: 'Notes for Site 1',
        scheduled_start_date_time: null,
        actual_start_date_time: null,
        scheduled_finished_date_time: null,
        actual_finished_date_time: null,
      },
      {
        site_id: site2,
        location_id: location2,
        customer_id: customer1,
        client_id: client2,
        job_number: 'Job002',
        site_name: 'Site 2',
        status_id: pending,
        cluster_id: 'Cluster B',
        estimated_hours: 300.0,
        notes: 'Notes for Site 2',
        scheduled_start_date_time: null,
        actual_start_date_time: null,
        scheduled_finished_date_time: null,
        actual_finished_date_time: null,
      },
      {
        site_id: site3,
        location_id: location3,
        customer_id: customer1,
        client_id: client3,
        job_number: 'Job003',
        site_name: 'Site 3',
        status_id: pending,
        cluster_id: 'Cluster C',
        estimated_hours: 400.0,
        notes: 'Notes for Site 3',
        scheduled_start_date_time: null,
        actual_start_date_time: null,
        scheduled_finished_date_time: null,
        actual_finished_date_time: null,
      },
      {
        site_id: site4,
        location_id: location4,
        customer_id: customer1,
        client_id: client4,
        job_number: 'Job004',
        site_name: 'Site 4',
        status_id: scheduled,
        cluster_id: 'Cluster D',
        estimated_hours: 250.0,
        notes: 'Notes for Site 4',
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: null,
        scheduled_finished_date_time: null,
        actual_finished_date_time: null,
      },
      {
        site_id: site5,
        location_id: location5,
        customer_id: customer1,
        client_id: client5,
        job_number: 'Job005',
        site_name: 'Site 5',
        status_id: scheduled,
        cluster_id: 'Cluster E',
        estimated_hours: 180.0,
        notes: 'Notes for Site 5',
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: null,
        scheduled_finished_date_time: null,
        actual_finished_date_time: null,
      },
      {
        site_id: site6,
        location_id: location6,
        customer_id: customer1,
        client_id: client5,
        job_number: 'Job006',
        site_name: 'Site 6',
        status_id: scheduled,
        cluster_id: 'Cluster F',
        estimated_hours: 183.0,
        notes: 'Notes for Site 6',
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: null,
        scheduled_finished_date_time: null,
        actual_finished_date_time: null,
      },
      {
        site_id: site7,
        location_id: location7,
        customer_id: customer1,
        client_id: client5,
        job_number: 'Job007',
        site_name: 'Site 7',
        status_id: in_progress,
        cluster_id: 'Cluster F',
        estimated_hours: 184.0,
        notes: 'Notes for Site 7',
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: new Date('2023-08-20 08:00:00'),
        scheduled_finished_date_time: null,
        actual_finished_date_time: null,
      },
      {
        site_id: site8,
        location_id: location8,
        customer_id: customer1,
        client_id: client5,
        job_number: 'Job008',
        site_name: 'Site 8',
        status_id: in_progress,
        cluster_id: 'Cluster F',
        estimated_hours: 186.0,
        notes: 'Notes for Site 8',
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: new Date('2023-08-20 08:00:00'),
        scheduled_finished_date_time: null,
        actual_finished_date_time: null,
      },
      {
        site_id: site9,
        location_id: location9,
        customer_id: customer1,
        client_id: client5,
        job_number: 'Job009',
        site_name: 'Site 9',
        status_id: in_progress,
        cluster_id: 'Cluster F',
        estimated_hours: 133.0,
        notes: 'Notes for Site 9',
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: new Date('2023-08-20 08:00:00'),
        scheduled_finished_date_time: null,
        actual_finished_date_time: null,
      },
      {
        site_id: site10,
        location_id: location10,
        customer_id: customer1,
        client_id: client5,
        job_number: 'Job010',
        site_name: 'Site 10',
        status_id: completed,
        cluster_id: 'Cluster F',
        estimated_hours: 113.0,
        notes: 'Notes for Site 10',
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: new Date('2023-08-20 08:00:00'),
        scheduled_finished_date_time: new Date('2023-08-23 08:00:00'),
        actual_finished_date_time: new Date('2023-08-23 08:00:00'),
      },
      {
        site_id: site11,
        location_id: location11,
        customer_id: customer1,
        client_id: client5,
        job_number: 'Job011',
        site_name: 'Site 11',
        status_id: completed,
        cluster_id: 'Cluster F',
        estimated_hours: 1233.0,
        notes: 'Notes for Site 11',
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: new Date('2023-08-20 08:00:00'),
        scheduled_finished_date_time: new Date('2023-08-23 08:00:00'),
        actual_finished_date_time: new Date('2023-08-23 08:00:00'),
      },
      {
        site_id: site12,
        location_id: location12,
        customer_id: customer1,
        client_id: client5,
        job_number: 'Job012',
        site_name: 'Site 12',
        status_id: completed,
        cluster_id: 'Cluster F',
        estimated_hours: 183.0,
        notes: 'Notes for Site 12',
        scheduled_start_date_time: new Date('2023-07-20 08:00:00'),
        actual_start_date_time: new Date('2023-08-20 08:00:00'),
        scheduled_finished_date_time: new Date('2023-08-23 08:00:00'),
        actual_finished_date_time: new Date('2023-08-23 08:00:00'),
      },
    ],
  });

  return {
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
  };
};
