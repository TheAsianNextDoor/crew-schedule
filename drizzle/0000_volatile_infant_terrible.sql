CREATE TABLE IF NOT EXISTS "client" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "crew" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"size" integer NOT NULL,
	"weekly_hours" real NOT NULL,
	"weekly_capacity" real NOT NULL,
	"discipline" text NOT NULL,
	"foreman_id" uuid,
	"personnel_hourly_cost" real NOT NULL,
	"equipment_hourly_cost" real NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "crew_member" (
	"id" uuid PRIMARY KEY NOT NULL,
	"crew_id" uuid NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "foreman" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "phase" (
	"id" uuid PRIMARY KEY NOT NULL,
	"site_id" uuid NOT NULL,
	"order" integer NOT NULL,
	"crew_estimated_hours" real,
	"discipline" text NOT NULL,
	"assigned_crew_id" uuid,
	"scheduled_date_time" timestamp,
	"start_date_time" timestamp,
	"status" text NOT NULL,
	"sub_contractor_id" uuid NOT NULL,
	"mobilization_from_location" real[2],
	"estimated_mobilization_time" timestamp,
	"actual_mobilization_time" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "site" (
	"id" uuid PRIMARY KEY NOT NULL,
	"job_number" text,
	"name" text,
	"location" real[2],
	"cluster_id" text,
	"total_estimated_hours" real,
	"client_id" uuid,
	"attachments" text[],
	"notes" text,
	"current_phase_id" uuid,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sub_contractor" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"scheduled_date" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crew" ADD CONSTRAINT "crew_foreman_id_foreman_id_fk" FOREIGN KEY ("foreman_id") REFERENCES "foreman"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crew_member" ADD CONSTRAINT "crew_member_crew_id_crew_id_fk" FOREIGN KEY ("crew_id") REFERENCES "crew"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "phase" ADD CONSTRAINT "phase_site_id_site_id_fk" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "phase" ADD CONSTRAINT "phase_assigned_crew_id_crew_id_fk" FOREIGN KEY ("assigned_crew_id") REFERENCES "crew"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "phase" ADD CONSTRAINT "phase_sub_contractor_id_sub_contractor_id_fk" FOREIGN KEY ("sub_contractor_id") REFERENCES "sub_contractor"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "site" ADD CONSTRAINT "site_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "site" ADD CONSTRAINT "site_current_phase_id_phase_id_fk" FOREIGN KEY ("current_phase_id") REFERENCES "phase"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
