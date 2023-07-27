/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.raw(`
    CREATE TYPE "status" AS ENUM (
      'pending',
      'scheduled',
      'in_progress',
      'completed'
    );
    
    CREATE TABLE "company" (
      "id" uuid PRIMARY KEY,
      "name" text NOT NULL,
      "phone_number" text NOT NULL,
      "email" text NOT NULL,
      "address" text NOT NULL,
      "created_at" timestamp DEFAULT (now())
    );
    
    CREATE TABLE "discipline" (
      "id" uuid PRIMARY KEY,
      "company_id" uuid NOT NULL,
      "name" text NOT NULL
    );
    
    CREATE TABLE "client" (
      "id" uuid PRIMARY KEY,
      "name" text NOT NULL,
      "contact_first_name" text NOT NULL,
      "contact_last_name" text NOT NULL,
      "email" text NOT NULL,
      "phone_number" text NOT NULL,
      "headquarters_address" text NOT NULL,
      "created_at" timestamp DEFAULT (now())
    );
    
    CREATE TABLE "profile" (
      "id" uuid PRIMARY KEY,
      "profile_pic" text,
      "employee_id" uuid NOT NULL,
      "created_at" timestamp DEFAULT (now())
    );
    
    CREATE TABLE "employee" (
      "id" uuid UNIQUE PRIMARY KEY,
      "company_id" uuid NOT NULL,
      "first_name" text NOT NULL,
      "last_name" text NOT NULL,
      "phone_number" text,
      "email" text UNIQUE NOT NULL,
      "created_at" timestamp DEFAULT (now())
    );
    
    CREATE TABLE "crew" (
      "id" uuid PRIMARY KEY,
      "company_id" uuid NOT NULL,
      "discipline_id" uuid NOT NULL,
      "name" text NOT NULL,
      "size" integer DEFAULT 0,
      "weekly_hours" float,
      "weekly_capacity" float,
      "personnel_hourly_cost" float,
      "equipment_hourly_cost" float,
      "created_at" timestamp DEFAULT (now())
    );
    
    CREATE TABLE "crew_assignment" (
      "id" uuid PRIMARY KEY,
      "employee_id" uuid NOT NULL,
      "crew_id" uuid NOT NULL,
      "is_foreman" boolean,
      "created_at" timestamp DEFAULT (now())
    );
    
    CREATE TABLE "phase" (
      "id" uuid PRIMARY KEY,
      "site_id" uuid NOT NULL,
      "sub_contractor_id" uuid,
      "discipline_id" uuid NOT NULL,
      "order" integer NOT NULL,
      "status" status DEFAULT 'pending',
      "estimated_hours" float,
      "personnel_count" integer,
      "created_at" timestamp DEFAULT (now())
    );
    
    CREATE TABLE "phase_assignment" (
      "id" uuid PRIMARY KEY,
      "phase_id" uuid NOT NULL,
      "crew_id" uuid NOT NULL,
      "status" status DEFAULT 'pending',
      "estimated_hours" float,
      "mobilization_from_location" float[2],
      "estimated_mobilization_duration" float,
      "actual_mobilization_duration" float,
      "scheduled_date_time" timestamp,
      "start_date_time" timestamp,
      "finished_date_time" timestamp,
      "created_at" timestamp DEFAULT (now())
    );
    
    CREATE TABLE "site" (
      "id" uuid PRIMARY KEY,
      "company_id" uuid NOT NULL,
      "client_id" uuid NOT NULL,
      "current_phase_id" uuid,
      "job_number" text NOT NULL,
      "name" text NOT NULL,
      "status" status DEFAULT 'pending',
      "location" float[2] NOT NULL,
      "cluster_id" text,
      "estimated_hours" float,
      "attachments" text[],
      "notes" text,
      "scheduled_date_time" timestamp,
      "start_date_time" timestamp,
      "finished_date_time" timestamp,
      "created_at" timestamp DEFAULT (now())
    );
    
    CREATE INDEX ON "site" ("job_number");
    
    ALTER TABLE "discipline" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("id");
    
    ALTER TABLE "profile" ADD FOREIGN KEY ("employee_id") REFERENCES "employee" ("id");
    
    ALTER TABLE "employee" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("id");
    
    ALTER TABLE "crew" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("id");
    
    ALTER TABLE "crew" ADD FOREIGN KEY ("discipline_id") REFERENCES "discipline" ("id");
    
    ALTER TABLE "crew_assignment" ADD FOREIGN KEY ("employee_id") REFERENCES "employee" ("id");
    
    ALTER TABLE "crew_assignment" ADD FOREIGN KEY ("crew_id") REFERENCES "crew" ("id");
    
    ALTER TABLE "phase" ADD FOREIGN KEY ("site_id") REFERENCES "site" ("id");
    
    ALTER TABLE "phase" ADD FOREIGN KEY ("sub_contractor_id") REFERENCES "company" ("id");
    
    ALTER TABLE "phase" ADD FOREIGN KEY ("discipline_id") REFERENCES "discipline" ("id");
    
    ALTER TABLE "phase_assignment" ADD FOREIGN KEY ("phase_id") REFERENCES "phase" ("id");
    
    ALTER TABLE "phase_assignment" ADD FOREIGN KEY ("crew_id") REFERENCES "crew" ("id");
    
    ALTER TABLE "site" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("id");
    
    ALTER TABLE "site" ADD FOREIGN KEY ("client_id") REFERENCES "client" ("id");
    
    ALTER TABLE "site" ADD FOREIGN KEY ("current_phase_id") REFERENCES "phase" ("id");  
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.raw('DROP TYPE IF EXISTS status CASCADE');
  await knex.raw('DROP TABLE IF EXISTS company CASCADE');
  await knex.raw('DROP TABLE IF EXISTS discipline CASCADE');
  await knex.raw('DROP TABLE IF EXISTS client CASCADE');
  await knex.raw('DROP TABLE IF EXISTS profile CASCADE');
  await knex.raw('DROP TABLE IF EXISTS employee CASCADE');
  await knex.raw('DROP TABLE IF EXISTS crew CASCADE');
  await knex.raw('DROP TABLE IF EXISTS crew_member CASCADE');
  await knex.raw('DROP TABLE IF EXISTS phase_assignment CASCADE');
  await knex.raw('DROP TABLE IF EXISTS phase CASCADE');
  await knex.raw('DROP TABLE IF EXISTS crew_assignment CASCADE');
  await knex.raw('DROP TABLE IF EXISTS site CASCADE');
};
