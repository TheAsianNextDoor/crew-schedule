/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.raw(`
    CREATE TABLE "customer" (
      "customer_id" uuid PRIMARY KEY,
      "name" text NOT NULL,
      "phone_number" text NOT NULL,
      "email" text NOT NULL,
      "address" text NOT NULL,
      "created_at" timestamp DEFAULT (now())
    );
    
    CREATE TABLE "discipline" (
      "discipline_id" uuid PRIMARY KEY,
      "customer_id" uuid NOT NULL,
      "name" text NOT NULL
    );
    
    CREATE TABLE "client" (
      "client_id" uuid PRIMARY KEY,
      "name" text NOT NULL,
      "contact_first_name" text NOT NULL,
      "contact_last_name" text NOT NULL,
      "email" text NOT NULL,
      "phone_number" text NOT NULL,
      "headquarters_address" text NOT NULL,
      "created_at" timestamp DEFAULT (now())
    );
    
    CREATE TABLE "profile" (
      "profile_id" uuid PRIMARY KEY,
      "profile_pic" text,
      "person_id" uuid NOT NULL,
      "created_at" timestamp DEFAULT (now())
    );
    
    CREATE TABLE "role" (
      "role_id" uuid PRIMARY KEY,
      "role_name" text NOT NULL
    );
    
    CREATE TABLE "person" (
      "person_id" uuid UNIQUE PRIMARY KEY,
      "customer_id" uuid NOT NULL,
      "role_id" uuid NOT NULL,
      "first_name" text NOT NULL,
      "last_name" text NOT NULL,
      "phone_number" text,
      "email" text UNIQUE NOT NULL,
      "is_foreman" boolean DEFAULT false,
      "created_at" timestamp DEFAULT (now())
    );
    
    CREATE TABLE "crew" (
      "crew_id" uuid PRIMARY KEY,
      "customer_id" uuid NOT NULL,
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
      "crew_assignment_id" uuid PRIMARY KEY,
      "person_id" uuid NOT NULL,
      "crew_id" uuid NOT NULL,
      "is_foreman" boolean DEFAULT false,
      "created_at" timestamp DEFAULT (now())
    );
    
    CREATE TABLE "status" (
      "status_id" uuid PRIMARY KEY,
      "status_name" text NOT NULL
    );
    
    CREATE TABLE "phase" (
      "phase_id" uuid PRIMARY KEY,
      "site_id" uuid NOT NULL,
      "sub_contractor_id" uuid,
      "discipline_id" uuid NOT NULL,
      "status_id" uuid NOT NULL,
      "order" integer NOT NULL,
      "estimated_hours" float,
      "personnel_count" integer,
      "created_at" timestamp DEFAULT (now())
    );
    
    CREATE TABLE "phase_assignment" (
      "phase_assignment_id" uuid PRIMARY KEY,
      "phase_id" uuid NOT NULL,
      "crew_id" uuid NOT NULL,
      "status_id" uuid NOT NULL,
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
      "site_id" uuid PRIMARY KEY,
      "customer_id" uuid NOT NULL,
      "client_id" uuid NOT NULL,
      "current_phase_id" uuid,
      "status_id" uuid NOT NULL,
      "job_number" text NOT NULL,
      "name" text NOT NULL,
      "location" float[2] NOT NULL,
      "cluster_id" text,
      "estimated_hours" float,
      "notes" text,
      "scheduled_date_time" timestamp,
      "start_date_time" timestamp,
      "finished_date_time" timestamp,
      "created_at" timestamp DEFAULT (now())
    );
    
    CREATE TABLE "attachment" (
      "attachment_id" uuid PRIMARY KEY,
      "site_id" uuid NOT NULL,
      "attachment_path" text NOT NULL
    );
    
    CREATE INDEX ON "site" ("job_number");
    
    ALTER TABLE "discipline" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id");
    
    ALTER TABLE "profile" ADD FOREIGN KEY ("person_id") REFERENCES "person" ("person_id");
    
    ALTER TABLE "person" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id");
    
    ALTER TABLE "person" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("role_id");
    
    ALTER TABLE "crew" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id");
    
    ALTER TABLE "crew" ADD FOREIGN KEY ("discipline_id") REFERENCES "discipline" ("discipline_id");
    
    ALTER TABLE "crew_assignment" ADD FOREIGN KEY ("person_id") REFERENCES "person" ("person_id");
    
    ALTER TABLE "crew_assignment" ADD FOREIGN KEY ("crew_id") REFERENCES "crew" ("crew_id");
    
    ALTER TABLE "phase" ADD FOREIGN KEY ("site_id") REFERENCES "site" ("site_id");
    
    ALTER TABLE "phase" ADD FOREIGN KEY ("sub_contractor_id") REFERENCES "customer" ("customer_id");
    
    ALTER TABLE "phase" ADD FOREIGN KEY ("discipline_id") REFERENCES "discipline" ("discipline_id");
    
    ALTER TABLE "phase" ADD FOREIGN KEY ("status_id") REFERENCES "status" ("status_id");
    
    ALTER TABLE "phase_assignment" ADD FOREIGN KEY ("phase_id") REFERENCES "phase" ("phase_id");
    
    ALTER TABLE "phase_assignment" ADD FOREIGN KEY ("crew_id") REFERENCES "crew" ("crew_id");
    
    ALTER TABLE "phase_assignment" ADD FOREIGN KEY ("status_id") REFERENCES "status" ("status_id");
    
    ALTER TABLE "site" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id");
    
    ALTER TABLE "site" ADD FOREIGN KEY ("client_id") REFERENCES "client" ("client_id");
    
    ALTER TABLE "site" ADD FOREIGN KEY ("current_phase_id") REFERENCES "phase" ("phase_id");
    
    ALTER TABLE "site" ADD FOREIGN KEY ("status_id") REFERENCES "status" ("status_id");
    
    ALTER TABLE "attachment" ADD FOREIGN KEY ("site_id") REFERENCES "site" ("site_id");
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.raw('DROP TABLE IF EXISTS customer CASCADE');
  await knex.raw('DROP TABLE IF EXISTS discipline CASCADE');
  await knex.raw('DROP TABLE IF EXISTS client CASCADE');
  await knex.raw('DROP TABLE IF EXISTS role CASCADE');
  await knex.raw('DROP TABLE IF EXISTS profile CASCADE');
  await knex.raw('DROP TABLE IF EXISTS person CASCADE');
  await knex.raw('DROP TABLE IF EXISTS crew CASCADE');
  await knex.raw('DROP TABLE IF EXISTS crew_member CASCADE');
  await knex.raw('DROP TABLE IF EXISTS phase_assignment CASCADE');
  await knex.raw('DROP TABLE IF EXISTS status CASCADE');
  await knex.raw('DROP TABLE IF EXISTS phase CASCADE');
  await knex.raw('DROP TABLE IF EXISTS crew_assignment CASCADE');
  await knex.raw('DROP TABLE IF EXISTS site CASCADE');
  await knex.raw('DROP TABLE IF EXISTS attachment CASCADE');
};
