/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  const company1 = '1e796840-4bdc-4c39-b96b-7e7c8b9c37e1';
  const company2 = '2a1c75d0-1a8c-4ebf-8ff1-f4e56cc0ef19';
  const company3 = '3f98224c-756e-485f-9414-09e6fb83fc82';
  const company4 = '4b6c8ca6-89f9-4fe1-88e5-6d892e1f7306';
  const company5 = '5d3034c4-dc5e-4a8f-ba84-cc6ff9f7074d';

  await knex.raw(`
    INSERT INTO "company" ("id", "name", "phone_number", "email", "address") 
    VALUES 
      ('${company1}', 'Company 1', '1234567890', 'company1@example.com', 'Address 1'),
      ('${company2}', 'Company 2', '2345678901', 'company2@example.com', 'Address 2'),
      ('${company3}', 'Company 3', '3456789012', 'company3@example.com', 'Address 3'),
      ('${company4}', 'Company 4', '4567890123', 'company4@example.com', 'Address 4'),
      ('${company5}', 'Company 5', '5678901234', 'company5@example.com', 'Address 5');
  `);

  const disciplineAsphaltId = 'ddf34ce9-f305-465a-aba8-76c4c6cb0195';
  const disciplineConcreteId = '3fbb5fa8-277c-11ee-be56-0242ac120002';
  const disciplineStripingId = '43bf3430-277c-11ee-be56-0242ac120002';

  await knex.raw(`
    INSERT INTO "discipline" ("id", "company_id", "name")
    VALUES
      ('${disciplineAsphaltId}', '${company1}', 'asphalt'),
      ('${disciplineConcreteId}', '${company1}', 'concrete'),
      ('${disciplineStripingId}', '${company1}', 'striping');
  `);

  const client1 = '1151d9e7-9bca-4d34-9651-59f3e17961e0';
  const client2 = '2aa7ebf6-78f3-4aeb-a6c2-67f73992a4f5';
  const client3 = '3301a8de-275f-4de0-9c6e-3fca97c303c6';
  const client4 = '4a7766f5-2f7a-442e-9a2a-d392a74b51d5';
  const client5 = '5b7f14c2-f29a-4f92-b5fe-4970da3d2e8e';

  await knex.raw(`
    INSERT INTO "client" ("id", "name", "contact_first_name", "contact_last_name", "email", "phone_number", "headquarters_address")
    VALUES
      ('${client1}', 'Client 1', 'John', 'Doe', 'client1@example.com', '1234567890', 'Headquarters 1'),
      ('${client2}', 'Client 2', 'Jane', 'Smith', 'client2@example.com', '2345678901', 'Headquarters 2'),
      ('${client3}', 'Client 3', 'Michael', 'Johnson', 'client3@example.com', '3456789012', 'Headquarters 3'),
      ('${client4}', 'Client 4', 'Emily', 'Brown', 'client4@example.com', '4567890123', 'Headquarters 4'),
      ('${client5}', 'Client 5', 'David', 'Jones', 'client5@example.com', '5678901234', 'Headquarters 5');
  `);

  const employee1 = '2ab8189a-4b8d-431e-97d5-7e8582ab7453';
  const employee2 = '3bc2d31b-8c1b-4b47-8f5d-362669c2681e';
  const employee3 = '48e70e38-19ad-4c4a-8d43-4c8035d6a3be';
  const employee4 = '5e8d43db-86a0-4e3a-bff2-973d43251d94';
  const employee5 = '69b45d89-301e-4b5f-ba0e-1ed5fd3e678b';

  await knex.raw(`
    INSERT INTO "employee" ("id", "company_id", "first_name", "last_name", "phone_number", "email")
    VALUES
      ('${employee1}', '${company1}', 'Employee 1', 'Lastname', '1234567890', 'employee1@example.com'),
      ('${employee2}', '${company1}', 'Employee 2', 'Lastname', '2345678901', 'employee2@example.com'),
      ('${employee3}', '${company1}', 'Employee 3', 'Lastname', '3456789012', 'employee3@example.com'),
      ('${employee4}', '${company1}', 'Employee 4', 'Lastname', '4567890123', 'employee4@example.com'),
      ('${employee5}', '${company1}', 'Employee 5', 'Lastname', '5678901234', 'employee5@example.com');
  `);

  await knex.raw(`
    INSERT INTO "profile" ("id", "profile_pic", "employee_id")
    VALUES
      ('1232921e-5b39-42fc-8db0-d89e95c5a5a0', 'profile1.jpg', '${employee1}'),
      ('234b768d-5946-47df-8a97-22a3c34d5f8c', 'profile2.jpg', '${employee2}'),
      ('3a2bb36b-7ee5-46c4-b3ae-26f13261ce30', 'profile3.jpg', '${employee3}'),
      ('4ca3a60f-4777-4d99-8d91-7c853f02f86f', 'profile4.jpg', '${employee4}'),
      ('5e57bfa6-1d4a-4ee3-9120-1f61587c499e', 'profile5.jpg', '${employee5}');  
  `);

  const crew1 = '1534b63b-872c-40b2-89b3-d8e98c2dd3b9';
  const crew2 = '250cfaa3-cf5a-4879-99d5-55057be19836';
  const crew3 = '3c409579-9255-4ab4-a22c-13897d3aee5f';
  const crew4 = '4de04dc4-57e6-42d7-8f79-8eb4856f8e2a';
  const crew5 = '56e42e7e-5f1e-4c5d-8b3f-d4ef0658978b';

  await knex.raw(`
    INSERT INTO "crew" ("id", "company_id", "discipline_id", "name", "size", "weekly_hours", "weekly_capacity", "personnel_hourly_cost", "equipment_hourly_cost")
    VALUES
      ('${crew1}', '${company1}', '${disciplineAsphaltId}', 'Crew 1', 10, 40.0, 400.0, 25.0, 50.0),
      ('${crew2}', '${company1}', '${disciplineConcreteId}', 'Crew 2', 8, 32.0, 320.0, 20.0, 30.0),
      ('${crew3}', '${company1}', '${disciplineStripingId}', 'Crew 3', 12, 48.0, 480.0, 18.0, 40.0),
      ('${crew4}', '${company1}', '${disciplineAsphaltId}', 'Crew 4', 6, 24.0, 240.0, 22.0, 35.0),
      ('${crew5}', '${company1}', '${disciplineConcreteId}', 'Crew 5', 15, 60.0, 600.0, 16.0, 45.0);  
  `);

  await knex.raw(`
    INSERT INTO "crew_assignment" ("id", "employee_id", "crew_id", "is_foreman")
    VALUES
      ('1be3f4c2-7b4b-4e9c-bd57-7f4c131fd365', '${employee1}', '${crew1}', true),
      ('25f7828d-50dd-4d1d-97f4-3296890db1cd', '${employee2}', '${crew2}', false),
      ('3a6af98e-10f2-4e32-b5e9-246c34a63d4e', '${employee3}', '${crew3}', false),
      ('4d7b9e51-5461-413f-b7ef-bb00d5ea7de2', '${employee4}', '${crew4}', false),
      ('5fb3019f-af3d-4f4e-9fa7-545d8c3b6605', '${employee5}', '${crew5}', false);
  `);

  const site1 = '123b7483-803d-4b34-b519-48f28061d924';
  const site2 = '2349c764-9f42-43ae-8a6f-50b6e7e620de';
  const site3 = '34de25e2-6f62-4529-afda-46b5f6c39aa9';
  const site4 = '4521f3d8-d019-4577-8f09-2c33a3b62f34';
  const site5 = '556a17ef-3c0c-41e5-9c7d-2e271e303f07';
  const site6 = '456a17ef-3c0c-41e5-9c7d-2e271e303f07';
  const site7 = '456a18ef-3c0c-41e5-9c7d-2e271e303f07';
  const site8 = '456a17ef-1c0c-41e5-9c7d-2e271e303f07';
  const site9 = '558456a8-277e-11ee-be56-0242ac120002';
  const site10 = 'a259e2b8-277e-11ee-be56-0242ac120002';
  const site11 = 'aa06f726-277e-11ee-be56-0242ac120002';
  const site12 = 'ae06b168-277e-11ee-be56-0242ac120002';

  await knex.raw(`
    INSERT INTO "site" ("id", "company_id", "client_id", "current_phase_id", "job_number", "name", "status", "location", "cluster_id", "estimated_hours", "notes", "scheduled_date_time", "start_date_time", "finished_date_time")
    VALUES
      ('${site1}', '${company1}', '${client1}', NULL, 'Job001', 'Site 1', 'pending', '{1.23, 4.56}', 'Cluster A', 200.0, 'Notes for Site 1', NULL, NULL, NULL),
      ('${site2}', '${company1}', '${client2}', NULL, 'Job002', 'Site 2', 'pending', '{7.89, 1.23}', 'Cluster B', 300.0, 'Notes for Site 2', NULL, NULL, NULL),
      ('${site3}', '${company1}', '${client3}', NULL, 'Job003', 'Site 3', 'pending', '{4.56, 7.89}', 'Cluster C', 400.0, 'Notes for Site 3', NULL, NULL, NULL),
      ('${site4}', '${company1}', '${client4}', NULL, 'Job004', 'Site 4', 'scheduled', '{1.23, 7.89}', 'Cluster D', 250.0, 'Notes for Site 4', '2023-07-20 08:00:00', NULL, NULL),
      ('${site5}', '${company1}', '${client5}', NULL, 'Job005', 'Site 5', 'scheduled', '{7.89, 4.56}', 'Cluster E', 180.0, 'Notes for Site 5', '2023-07-20 08:00:00', NULL, NULL),
      ('${site6}', '${company1}', '${client5}', NULL, 'Job006', 'Site 6', 'scheduled', '{7.89, 4.56}', 'Cluster F', 183.0, 'Notes for Site 6', '2023-07-20 08:00:00', NULL, NULL),
      ('${site7}', '${company1}', '${client5}', NULL, 'Job007', 'Site 7', 'in_progress', '{7.89, 4.56}', 'Cluster F', 184.0, 'Notes for Site 7', '2023-07-20 08:00:00', '2023-08-20 08:00:00', NULL),
      ('${site8}', '${company1}', '${client5}', NULL, 'Job008', 'Site 8', 'in_progress', '{7.89, 4.56}', 'Cluster F', 186.0, 'Notes for Site 8', '2023-07-20 08:00:00', '2023-08-20 08:00:00', NULL),
      ('${site9}', '${company1}', '${client5}', NULL, 'Job009', 'Site 9', 'in_progress', '{7.89, 4.56}', 'Cluster F', 133.0, 'Notes for Site 9', '2023-07-20 08:00:00', '2023-08-20 08:00:00', NULL),
      ('${site10}', '${company1}', '${client5}', NULL, 'Job010', 'Site 10', 'completed', '{7.89, 4.56}', 'Cluster F', 113.0, 'Notes for Site 10', '2023-07-20 08:00:00', '2023-08-20 08:00:00', '2023-08-23 08:00:00'),
      ('${site11}', '${company1}', '${client5}', NULL, 'Job011', 'Site 11', 'completed', '{7.89, 4.56}', 'Cluster F', 1233.0, 'Notes for Site 11', '2023-07-20 08:00:00', '2023-08-20 08:00:00', '2023-08-23 08:00:00'),
      ('${site12}', '${company1}', '${client5}', NULL, 'Job012', 'Site 12', 'completed', '{7.89, 4.56}', 'Cluster F', 183.0, 'Notes for Site 12', '2023-07-20 08:00:00', '2023-08-20 08:00:00', '2023-08-23 08:00:00');
  `);

  const phase1 = '144c3e95-1fd2-4baf-9a7d-3eef49a36d47';
  const phase2 = '2590a2e0-cc81-4461-982d-6c5c350f4d36';
  const phase3 = '36667f81-1ce0-4d4a-aae9-746c7e36e9c3';
  const phase4 = '4b03b70f-3be1-4c2b-8a11-48ae8f2b7d48';
  const phase5 = '5d73d9c4-66db-4c10-b6ed-c724d75dd77b';
  const phase6 = '5d73d2c4-66db-4c10-b6ed-c724d75dd77b';
  const phase7 = '5d93d2c4-66db-4c10-b6ed-c724d75dd77b';
  const phase8 = '5d72d2c4-66db-4c10-b6ed-c724d75dd77b';
  const phase9 = '5d73a2c4-66db-4c10-b6ed-c724d75dd77b';
  const phase10 = 'd8b75782-277e-11ee-be56-0242ac120002';
  const phase11 = 'deb35e88-277e-11ee-be56-0242ac120002';
  const phase12 = 'e1d8b356-277e-11ee-be56-0242ac120002';

  await knex.raw(`
    INSERT INTO "phase" ("id", "site_id", "sub_contractor_id", "discipline_id", "order", "status", "estimated_hours", "personnel_count")
    VALUES
      ('${phase1}', '${site1}', NULL, '${disciplineAsphaltId}', 1, 'pending', NULL, NULL),
      ('${phase2}', '${site2}', NULL, '${disciplineConcreteId}', 1, 'pending', NULL, NULL),
      ('${phase3}', '${site3}', NULL, '${disciplineStripingId}', 1, 'pending', NULL, NULL),
      ('${phase4}', '${site4}', NULL, '${disciplineAsphaltId}', 1, 'scheduled', 32, 12),
      ('${phase5}', '${site5}', NULL, '${disciplineConcreteId}', 1, 'scheduled', 19, 91),
      ('${phase6}', '${site6}', NULL, '${disciplineStripingId}', 1, 'scheduled', 22, 123),
      ('${phase7}', '${site7}', NULL, '${disciplineAsphaltId}', 1, 'in_progress', 22.9, 128),
      ('${phase8}', '${site8}', NULL, '${disciplineConcreteId}', 1, 'in_progress', 222.9, 125),
      ('${phase9}', '${site9}', NULL, '${disciplineStripingId}', 1, 'in_progress', 22.0, 13),
      ('${phase10}', '${site10}', NULL, '${disciplineAsphaltId}', 1, 'completed', 22, 23),
      ('${phase11}', '${site11}', NULL, '${disciplineConcreteId}', 1, 'completed', 23, 322),
      ('${phase12}', '${site12}', NULL, '${disciplineStripingId}', 1, 'completed', 29, 1203);
  `);

  const phaseAssignment1 = '1a8b93db-3292-4c1d-85fe-ee012dd1e5d1';
  const phaseAssignment2 = '2a8b93db-3292-4c1d-85fe-ee012dd1e5d1';
  const phaseAssignment3 = '1b8b93db-3292-4c1d-85fe-ee012dd1e5d1';
  const phaseAssignment4 = '1a9b93db-3292-4c1d-85fe-ee012dd1e5d1';
  const phaseAssignment5 = '1a8c93db-3292-4c1d-85fe-ee012dd1e5d1';
  const phaseAssignment6 = '1a8a93db-3292-4c1d-85fe-ee012dd1e5d1';
  const phaseAssignment7 = '1a8b73db-3292-4c1d-85fe-ee012dd1e5d1';
  const phaseAssignment8 = '1a8b33db-3292-4c1d-85fe-ee012dd1e5d1';
  const phaseAssignment9 = '1a8b94db-3292-4c1d-85fe-ee012dd1e5d1';

  await knex.raw(`
    INSERT INTO "phase_assignment" ("id", "phase_id", "crew_id", "status", "estimated_hours", "mobilization_from_location", "estimated_mobilization_duration", "actual_mobilization_duration", "scheduled_date_time", "start_date_time", "finished_date_time")
    VALUES
      ('${phaseAssignment1}', '${phase4}', '${crew1}', 'scheduled', 80.0, '{1.23, 4.56}', 2.5, NULL, '2023-07-20 08:00:00', NULL, NULL),
      ('${phaseAssignment2}', '${phase5}', '${crew1}', 'scheduled', 81.0, '{1.23, 4.56}', 1.5, NULL, '2023-07-20 08:00:00', NULL, NULL),
      ('${phaseAssignment3}', '${phase6}', '${crew1}', 'scheduled', 82.0, '{1.23, 4.56}', 4.5, NULL, '2023-07-20 08:00:00', NULL, NULL),
      ('${phaseAssignment4}', '${phase7}', '${crew2}', 'in_progress', 84.0, '{1.23, 4.56}', 9.5, 92, '2023-07-20 08:00:00', '2023-07-20 08:00:00', NULL),
      ('${phaseAssignment5}', '${phase8}', '${crew2}', 'in_progress', 86.0, '{1.23, 4.56}', 7.5, 10, '2023-07-20 08:00:00', '2023-09-20 08:00:00', NULL),
      ('${phaseAssignment6}', '${phase9}', '${crew2}', 'in_progress', 89.0, '{1.23, 4.56}', 23.5, 23.0, '2023-07-20 08:00:00', '2023-08-20 08:00:00', NULL),
      ('${phaseAssignment7}', '${phase10}', '${crew3}', 'completed', 80.0, '{1.23, 4.56}', 2.5, 10.4, '2023-07-20 08:00:00', '2023-08-20 08:00:00', '2023-08-21 08:00:00'),
      ('${phaseAssignment8}', '${phase11}', '${crew3}', 'completed', 813.0, '{1.23, 4.56}', 3.5, 11.9, '2023-07-20 08:00:00', '2023-08-20 08:00:00', '2023-08-22 08:00:00'),
      ('${phaseAssignment9}', '${phase12}', '${crew3}', 'completed', 49.0, '{1.23, 4.56}', 30.5, 10.99, '2023-07-20 08:00:00', '2023-08-20 08:00:00', '2023-08-23 08:00:00');
  `);
};
