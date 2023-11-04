import { PrismaClient } from '@prisma/client';
import { addresses } from './seed-helpers/address';
import { customers } from './seed-helpers/customer';

const prisma = new PrismaClient();

const main = async () => {
  const {
    address1,
    address2,
    address3,
    address4,
    address5,
    address6,
    address7,
    address8,
    address9,
    address10,
  } = await addresses(prisma);

  const { customer1 } = await customers(prisma, {
    address1,
    address2,
    address3,
    address4,
    address5,
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
        status_name: 'IN_PROGRESS',
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
        address_id: address1,
        customer_id: customer1,
        client_name: 'Client 1',
        contact_first_name: 'John',
        contact_last_name: 'Doe',
        email: 'client1@example.com',
        phone_number: '1234567890',
      },
      {
        client_id: client2,
        address_id: address2,
        customer_id: customer1,
        client_name: 'Client 2',
        contact_first_name: 'Emily',
        contact_last_name: 'Brown',
        email: 'client2@example.com',
        phone_number: '1234567890',
      },
      {
        client_id: client3,
        address_id: address3,
        customer_id: customer1,
        client_name: 'Client 3',
        contact_first_name: 'Jane',
        contact_last_name: 'Smith',
        email: 'client3@example.com',
        phone_number: '1234567890',
      },
      {
        client_id: client4,
        address_id: address4,
        customer_id: customer1,
        client_name: 'Client 4',
        contact_first_name: 'Michael',
        contact_last_name: 'Johnson',
        email: 'client4@example.com',
        phone_number: '1234567890',
      },
      {
        client_id: client5,
        address_id: address5,
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
  const person6 = '71b45d89-301e-4b5f-ba0e-1ed5fd3e678b';
  const person7 = '51b45d89-301e-4b5f-ba0e-1ed5fd3e678a';
  const person8 = '91b45d89-301e-4b5f-ba0e-1ed5fd3e678c';
  const person9 = '91b45d89-301e-4b5f-ba0e-1ed5fd3e678d';

  await prisma.person.createMany({
    data: [
      {
        person_id: person9,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'imran',
        person_last_name: 'reeds',
        phone_number: '1234567890',
        email: 'imran.artwell@gmail.com',
        is_foreman: true,
      },
      {
        person_id: person1,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'first 1',
        person_last_name: 'last 1',
        phone_number: '1234567890',
        email: 'aaron.o.scherling@gmail.com',
        is_foreman: true,
      },
      {
        person_id: person8,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'aaron',
        person_last_name: 'scherling',
        phone_number: '1234567890',
        email: 'aaron.scherling11490@gmail.com',
        is_foreman: true,
      },
      {
        person_id: person7,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'aaron',
        person_last_name: 'solie',
        phone_number: '1234567890',
        email: 'solieaaron@gmail.com',
        is_foreman: true,
      },
      {
        person_id: person2,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'first 2',
        person_last_name: 'last 2',
        phone_number: '1234567890',
        email: 'person2@example.com',
        is_foreman: true,
      },
      {
        person_id: person3,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'first 3',
        person_last_name: 'last 3',
        phone_number: '1234567890',
        email: 'person3@example.com',
        is_foreman: true,
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
      {
        person_id: person6,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'first 6',
        person_last_name: 'last 6',
        phone_number: '1234567890',
        email: 'jordanho.work@gmail.com',
        is_foreman: true,
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

  const location1 = 'd31f7a07-7df3-4d0b-9bfb-02b5d1e0136f';
  const location2 = '6a332255-0a08-45a9-a97d-8e9946d1cc3a';
  const location3 = '3f94ea2c-408a-4f45-a10e-73c00f4e2cc6';
  const location4 = 'f4518b2f-8d15-4c8b-8d68-7f35dbfcbf84';
  const location5 = '8110de65-9145-47d4-9ee2-6f5022da5f4d';
  const location6 = '34a7734b-4a12-47fb-ae3b-09f646ea14b0';
  const location7 = '84e1c64b-952c-483b-a346-2bafbb3fcb8a';
  const location8 = 'b7e7c8bf-7f39-4aa0-9ce1-54f06e0b6db2';
  const location9 = 'e3d5c20d-7e3e-4e14-9447-482baed0cb9a';
  const location10 = '1fd73f6a-936f-41a5-9a03-27e08f8e8e8c';
  const location11 = '2fd73f6a-936f-41a5-9a03-27e08f8e8e8c';
  const location12 = '3fd73f6a-936f-41a5-9a03-27e08f8e8e8c';
  await prisma.location.createMany({
    data: [
      {
        location_id: location1,
        customer_id: customer1,
        address_id: address1,
        lat: 51.49,
        lng: -0.09,
      },
      {
        location_id: location2,
        customer_id: customer1,
        address_id: address2,
        lat: 51.53,
        lng: -0.07,
      },
      {
        location_id: location3,
        customer_id: customer1,
        address_id: address3,
        lat: 51.501,
        lng: -0.08,
      },
      {
        location_id: location4,
        customer_id: customer1,
        address_id: address4,
        lat: 51.505,
        lng: -0.06,
      },
      {
        location_id: location5,
        customer_id: customer1,
        address_id: address5,
        lat: 51.509,
        lng: -0.09,
      },
      {
        location_id: location6,
        customer_id: customer1,
        address_id: address6,
        lat: 51.485,
        lng: -0.05,
      },
      {
        location_id: location7,
        customer_id: customer1,
        address_id: address7,
        lat: 51.503,
        lng: -0.07,
      },
      {
        location_id: location8,
        customer_id: customer1,
        address_id: address8,
        lat: 51.502,
        lng: -0.05,
      },
      {
        location_id: location9,
        customer_id: customer1,
        address_id: address9,
        lat: 51.517,
        lng: -0.11,
      },
      {
        location_id: location10,
        customer_id: customer1,
        address_id: address10,
        lat: 51.535,
        lng: -0.12,
      },
      {
        location_id: location11,
        customer_id: customer1,
        address_id: address1,
        lat: 51.51,
        lng: -0.13,
      },
      {
        location_id: location12,
        customer_id: customer1,
        address_id: address2,
        lat: 51.515,
        lng: -0.08,
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
        status_id: scheduled,
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
        foreman_id: person2,
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
        status_id: in_progress,
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
        status_id: completed,
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
        status_id: completed,
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
        status_id: completed,
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
        status_id: completed,
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
        status_id: completed,
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
