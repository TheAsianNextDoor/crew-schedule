import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const fargo = await prisma.city.create({
    data: {
      city_id: '9f1f5b84-580e-4bbb-94c9-7db589658ab6',
      city: 'Fargo',
    },
  });

  const ND = await prisma.state.create({
    data: {
      state_id: '30b50922-a66b-4fe0-b5ad-9c24a41c57ea',
      state: 'ND',
    },
  });

  const US = await prisma.country.create({
    data: {
      country_id: '7538a546-5785-4fa7-aa09-00a8bcdf4ff8',
      country: 'US',
    },
  });

  const zip = await prisma.zipCode.create({
    data: {
      zip_code_id: '573cde07-024d-4dfe-8453-9d9408a5b333',
      zip_code: '58102',
    },
  });

  const address = await prisma.address.create({
    data: {
      address_id: '180390a3-2df5-46a4-bb59-4d972b595bab',
      city_id: fargo.city_id,
      state_id: ND.state_id,
      zip_code_id: zip.zip_code_id,
      country_id: US.country_id,
      street: 'abc street N',
    },
  });

  const customer1 = '8c619eb3-b8b1-4520-bc6a-f51e0677ec37';

  await prisma.customer.createMany({
    data: [
      {
        customer_id: customer1,
        address_id: address.address_id,
        customer_name: 'Customer 1',
        phone_number: '1234567890',
        email: 'customer1@example.com',
      },
      {
        customer_id: '0123e406-c408-4b88-88dc-8b2f27c741ab',
        address_id: address.address_id,
        customer_name: 'Customer 2',
        phone_number: '1234567890',
        email: 'customer2@example.com',
      },
      {
        customer_id: 'f380f753-9ed5-44df-9e7a-67946cc2ab17',
        address_id: address.address_id,
        customer_name: 'Customer 3',
        phone_number: '1234567890',
        email: 'customer3@example.com',
      },
      {
        customer_id: '049d87ce-7bb9-48b3-b651-4b7b1708ae8d',
        address_id: address.address_id,
        customer_name: 'Customer 4',
        phone_number: '1234567890',
        email: 'customer4@example.com',
      },
      {
        customer_id: 'a13502fb-d3e0-4c7e-a444-5d4943c34f46',
        address_id: address.address_id,
        customer_name: 'Customer 5',
        phone_number: '1234567890',
        email: 'customer5@example.com',
      },
    ],
  });

  const pending = '1e596840-4bdc-4c39-b96b-7e7c8b9c37e1';
  const scheduled = '27be955c-44ed-4299-bd10-6fd8525a5d62';
  const in_progress = 'cdf59269-10ec-4690-8a67-8956b8a172b2';
  const completed = '65191e7f-62e9-45dc-a629-b28d8b6280b4';

  await prisma.status.createMany({
    data: [
      {
        status_id: pending,
        customer_id: customer1,
        status_name: 'PENDING',
      },
      {
        status_id: scheduled,
        customer_id: customer1,
        status_name: 'SCHEDULED',
      },
      {
        status_id: in_progress,
        customer_id: customer1,
        status_name: 'IN PROGRESS',
      },
      {
        status_id: completed,
        customer_id: customer1,
        status_name: 'COMPLETED',
      },
    ],
  });

  const asphalt = '65e50c99-1dd4-474e-a964-8829f079215e';
  const concrete = '45e6ed2e-97ab-4083-87c7-804c36affa26';
  const striping = '49d843bc-6d30-4638-8e0e-30a548c6aeff';

  await prisma.discipline.createMany({
    data: [
      {
        discipline_id: asphalt,
        customer_id: customer1,
        discipline_name: 'asphalt',
      },
      {
        discipline_id: concrete,
        customer_id: customer1,
        discipline_name: 'concrete',
      },
      {
        discipline_id: striping,
        customer_id: customer1,
        discipline_name: 'striping',
      },
    ],
  });

  const client1 = '1151d9e7-9bca-4d34-9651-59f3e17961e0';
  const client2 = '2aa7ebf6-78f3-4aeb-a6c2-67f73992a4f5';
  const client3 = '3301a8de-275f-4de0-9c6e-3fca97c303c6';
  const client4 = '4a7766f5-2f7a-442e-9a2a-d392a74b51d5';
  const client5 = '5b7f14c2-f29a-4f92-b5fe-4970da3d2e8e';

  await prisma.client.createMany({
    data: [
      {
        client_id: client1,
        address_id: address.address_id,
        customer_id: customer1,
        client_name: 'Client 1',
        contact_first_name: 'John',
        contact_last_name: 'Doe',
        email: 'client1@example.com',
        phone_number: '1234567890',
      },
      {
        client_id: client2,
        address_id: address.address_id,
        customer_id: customer1,
        client_name: 'Client 2',
        contact_first_name: 'Emily',
        contact_last_name: 'Brown',
        email: 'client2@example.com',
        phone_number: '1234567890',
      },
      {
        client_id: client3,
        address_id: address.address_id,
        customer_id: customer1,
        client_name: 'Client 3',
        contact_first_name: 'Jane',
        contact_last_name: 'Smith',
        email: 'client3@example.com',
        phone_number: '1234567890',
      },
      {
        client_id: client4,
        address_id: address.address_id,
        customer_id: customer1,
        client_name: 'Client 4',
        contact_first_name: 'Michael',
        contact_last_name: 'Johnson',
        email: 'client4@example.com',
        phone_number: '1234567890',
      },
      {
        client_id: client5,
        address_id: address.address_id,
        customer_id: customer1,
        client_name: 'Client 5',
        contact_first_name: 'David',
        contact_last_name: 'Jones',
        email: 'client5@example.com',
        phone_number: '1234567890',
      },
    ],
  });

  const standard = '3cc8dd25-391e-4b83-92d6-d09e539a6376';
  const admin = '31b4fe1a-c895-46ae-a1cc-00b7c80cb8b6';

  await prisma.role.createMany({
    data: [
      {
        role_id: standard,
        role_name: 'STANDARD',
        customer_id: customer1,
      },
      {
        role_id: admin,
        role_name: 'ADMIN',
        customer_id: customer1,
      },
    ],
  });

  const person1 = '2ab8189a-4b8d-431e-97d5-7e8582ab7453';
  const person2 = '3bc2d31b-8c1b-4b47-8f5d-362669c2681e';
  const person3 = '48e70e38-19ad-4c4a-8d43-4c8035d6a3be';
  const person4 = '5e8d43db-86a0-4e3a-bff2-973d43251d94';
  const person5 = '69b45d89-301e-4b5f-ba0e-1ed5fd3e678b';

  await prisma.person.createMany({
    data: [
      {
        person_id: person1,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'first 1',
        person_last_name: 'last 1',
        phone_number: '1234567890',
        email: 'aaron.o.scherling@gmail.com',
        is_foreman: false,
      },
      {
        person_id: person2,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'first 2',
        person_last_name: 'last 2',
        phone_number: '1234567890',
        email: 'person2@example.com',
        is_foreman: false,
      },
      {
        person_id: person3,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'first 3',
        person_last_name: 'last 3',
        phone_number: '1234567890',
        email: 'person3@example.com',
        is_foreman: false,
      },
      {
        person_id: person4,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'first 4',
        person_last_name: 'last 4',
        phone_number: '1234567890',
        email: 'person4@example.com',
        is_foreman: false,
      },
      {
        person_id: person5,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'first 5',
        person_last_name: 'last 5',
        phone_number: '5234567890',
        email: 'person5@example.com',
        is_foreman: false,
      },
    ],
  });

  await prisma.profile.createMany({
    data: [
      {
        profile_id: '1232921e-5b39-42fc-8db0-d89e95c5a5a0',
        profile_pic: 'profile1.jpg',
        person_id: person1,
      },
      {
        profile_id: '234b768d-5946-47df-8a97-22a3c34d5f8c',
        profile_pic: 'profile2.jpg',
        person_id: person2,
      },
      {
        profile_id: '3a2bb36b-7ee5-46c4-b3ae-26f13261ce30',
        profile_pic: 'profile3.jpg',
        person_id: person3,
      },
      {
        profile_id: '4ca3a60f-4777-4d99-8d91-7c853f02f86f',
        profile_pic: 'profile1.jpg',
        person_id: person1,
      },
      {
        profile_id: '5e57bfa6-1d4a-4ee3-9120-1f61587c499e',
        profile_pic: 'profile5.jpg',
        person_id: person5,
      },
    ],
  });

  const crew1 = '1534b63b-872c-40b2-89b3-d8e98c2dd3b9';
  const crew2 = '250cfaa3-cf5a-4879-99d5-55057be19836';
  const crew3 = '3c409579-9255-4ab4-a22c-13897d3aee5f';
  const crew4 = '4de04dc4-57e6-42d7-8f79-8eb4856f8e2a';
  const crew5 = '56e42e7e-5f1e-4c5d-8b3f-d4ef0658978b';

  await prisma.crew.createMany({
    data: [
      {
        crew_id: crew1,
        customer_id: customer1,
        discipline_id: asphalt,
        crew_name: 'Crew 1',
        size: 10,
        weekly_hours: 40.0,
        weekly_capacity: 400.0,
        personnel_hourly_cost: 25.0,
        equipment_hourly_cost: 50.0,
      },
      {
        crew_id: crew2,
        customer_id: customer1,
        discipline_id: concrete,
        crew_name: 'Crew 2',
        size: 8,
        weekly_hours: 32.0,
        weekly_capacity: 320.0,
        personnel_hourly_cost: 20.0,
        equipment_hourly_cost: 30.0,
      },
      {
        crew_id: crew3,
        customer_id: customer1,
        discipline_id: striping,
        crew_name: 'Crew 3',
        size: 12,
        weekly_hours: 48.0,
        weekly_capacity: 480.0,
        personnel_hourly_cost: 18.0,
        equipment_hourly_cost: 40.0,
      },
      {
        crew_id: crew4,
        customer_id: customer1,
        discipline_id: asphalt,
        crew_name: 'Crew 4',
        size: 6,
        weekly_hours: 24.0,
        weekly_capacity: 240.0,
        personnel_hourly_cost: 22.0,
        equipment_hourly_cost: 35.0,
      },
      {
        crew_id: crew5,
        customer_id: customer1,
        discipline_id: concrete,
        crew_name: 'Crew 5',
        size: 15,
        weekly_hours: 60.0,
        weekly_capacity: 600.0,
        personnel_hourly_cost: 16.0,
        equipment_hourly_cost: 45.0,
      },
    ],
  });

  await prisma.crewAssignment.createMany({
    data: [
      {
        crew_assignment_id: '1be3f4c2-7b4b-4e9c-bd57-7f4c131fd365',
        customer_id: customer1,
        person_id: person1,
        crew_id: crew1,
      },
      {
        crew_assignment_id: '25f7828d-50dd-4d1d-97f4-3296890db1cd',
        customer_id: customer1,
        person_id: person2,
        crew_id: crew2,
      },
      {
        crew_assignment_id: '3a6af98e-10f2-4e32-b5e9-246c34a63d4e',
        customer_id: customer1,
        person_id: person3,
        crew_id: crew3,
      },
      {
        crew_assignment_id: '4d7b9e51-5461-413f-b7ef-bb00d5ea7de2',
        customer_id: customer1,
        person_id: person4,
        crew_id: crew4,
      },
      {
        crew_assignment_id: '5fb3019f-af3d-4f4e-9fa7-545d8c3b6605',
        customer_id: customer1,
        person_id: person5,
        crew_id: crew5,
      },
    ],
  });

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
        customer_id: customer1,
        client_id: client1,
        job_number: 'Job001',
        site_name: 'Site 1',
        status_id: pending,
        location: [51.49, -0.09],
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
        customer_id: customer1,
        client_id: client2,
        job_number: 'Job002',
        site_name: 'Site 2',
        status_id: pending,
        location: [51.53, -0.07],
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
        customer_id: customer1,
        client_id: client3,
        job_number: 'Job003',
        site_name: 'Site 3',
        status_id: pending,
        location: [51.501, -0.08],
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
        customer_id: customer1,
        client_id: client4,
        job_number: 'Job004',
        site_name: 'Site 4',
        status_id: scheduled,
        location: [51.505, -0.06],
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
        customer_id: customer1,
        client_id: client5,
        job_number: 'Job005',
        site_name: 'Site 5',
        status_id: scheduled,
        location: [51.509, -0.09],
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
        customer_id: customer1,
        client_id: client5,
        job_number: 'Job006',
        site_name: 'Site 6',
        status_id: scheduled,
        location: [51.485, -0.05],
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
        customer_id: customer1,
        client_id: client5,
        job_number: 'Job007',
        site_name: 'Site 7',
        status_id: in_progress,
        location: [51.503, -0.07],
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
        customer_id: customer1,
        client_id: client5,
        job_number: 'Job008',
        site_name: 'Site 8',
        status_id: in_progress,
        location: [51.502, -0.05],
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
        customer_id: customer1,
        client_id: client5,
        job_number: 'Job009',
        site_name: 'Site 9',
        status_id: in_progress,
        location: [51.517, -0.11],
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
        customer_id: customer1,
        client_id: client5,
        job_number: 'Job010',
        site_name: 'Site 10',
        status_id: completed,
        location: [51.535, -0.12],
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
        customer_id: customer1,
        client_id: client5,
        job_number: 'Job011',
        site_name: 'Site 11',
        status_id: completed,
        location: [51.51, -0.13],
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
        customer_id: customer1,
        client_id: client5,
        job_number: 'Job012',
        site_name: 'Site 12',
        status_id: completed,
        location: [51.515, -0.08],
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
        status_id: scheduled,
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
        status_id: scheduled,
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
        status_id: scheduled,
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
        status_id: in_progress,
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
        status_id: in_progress,
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
        status_id: in_progress,
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
        status_id: completed,
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
        status_id: completed,
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
        status_id: completed,
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
        status_id: completed,
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
        status_id: completed,
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
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
    process.exit();
  });
